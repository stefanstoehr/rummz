# Create geotech IFC model
import json, ifcopenshell
from IPython.display import display, Markdown

def new_guid():
    return ifcopenshell.guid.new()

# Initialise empty IFC file (IFC4 schema)
ifc = ifcopenshell.file(schema="IFC4")

# ----------------------------------------------------------------------
# Geometric representation context (3‑D)
origin = ifc.create_entity("IfcCartesianPoint", (0.0, 0.0, 0.0))
axis_dir = ifc.create_entity("IfcDirection", (0.0, 0.0, 1.0))
ref_dir = ifc.create_entity("IfcDirection", (1.0, 0.0, 0.0))
world_axis = ifc.create_entity(
    "IfcAxis2Placement3D",
    Location=origin,
    Axis=axis_dir,
    RefDirection=ref_dir,
)
geom_context = ifc.create_entity(
    "IfcGeometricRepresentationContext",
    ContextIdentifier="Model",
    ContextType="Model",
    CoordinateSpaceDimension=3,
    Precision=1e-5,
    WorldCoordinateSystem=world_axis,
    TrueNorth=None,
)

# ----------------------------------------------------------------------
# Project (add representation context)
project = ifc.create_entity(
    "IfcProject", GlobalId=new_guid(), Name="Baugrundmodell"
)
project.RepresentationContexts = [geom_context]

# ----------------------------------------------------------------------
# Site
site_place = ifc.create_entity(
    "IfcLocalPlacement", PlacementRelTo=None, RelativePlacement=world_axis
)
site = ifc.create_entity(
    "IfcSite",
    GlobalId=new_guid(),
    Name="Baufeld A",
    ObjectPlacement=site_place,
)

# ----------------------------------------------------------------------
# Building (acts as the geotechnical facility)
building_place = ifc.create_entity(
    "IfcLocalPlacement", PlacementRelTo=site_place, RelativePlacement=world_axis
)
building = ifc.create_entity(
    "IfcBuilding",
    GlobalId=new_guid(),
    Name="Baugrund",
    ObjectPlacement=building_place,
)

# ----------------------------------------------------------------------
# Borehole proxy (IfcBuildingElementProxy)
borehole_place = ifc.create_entity(
    "IfcLocalPlacement", PlacementRelTo=building_place, RelativePlacement=world_axis
)
borehole = ifc.create_entity(
    "IfcBuildingElementProxy",
    GlobalId=new_guid(),
    Name="BH01",
    ObjectPlacement=borehole_place,
)

# ----------------------------------------------------------------------
# Borehole geometry (cylinder + block for each stratum)
borehole_radius = 0.10  # 10 cm radius

strata_info = [
    {"name": "BH01_Auffüllung", "start": 0.0, "end": 1.2},
    {"name": "BH01_Sand",       "start": 1.2, "end": 4.8},
    {"name": "BH01_Ton",        "start": 4.8, "end": 8.0},
]

strata_entities = []
for s in strata_info:
    thickness = s["end"] - s["start"]

    # Cylinder (core)
    circle_prof = ifc.create_entity(
        "IfcCircleProfileDef", ProfileType="AREA", Radius=borehole_radius
    )
    start_pt = ifc.create_entity("IfcCartesianPoint", (0.0, 0.0, s["start"]))
    placement = ifc.create_entity(
        "IfcAxis2Placement3D",
        Location=start_pt,
        Axis=axis_dir,
        RefDirection=ref_dir,
    )
    cylinder = ifc.create_entity(
        "IfcExtrudedAreaSolid",
        SweptArea=circle_prof,
        Position=placement,
        ExtrudedDirection=axis_dir,
        Depth=thickness,
    )

    # Spread block (simple rectangular volume)
    rect_prof = ifc.create_entity(
        "IfcRectangleProfileDef",
        ProfileType="AREA",
        XDim=0.5,
        YDim=0.5,
    )
    block = ifc.create_entity(
        "IfcExtrudedAreaSolid",
        SweptArea=rect_prof,
        Position=placement,
        ExtrudedDirection=axis_dir,
        Depth=thickness,
    )

    # Shape representation (both solids together)
    shape_rep = ifc.create_entity(
        "IfcShapeRepresentation",
        ContextOfItems=geom_context,
        RepresentationIdentifier="Body",
        RepresentationType="SweptSolid",
        Items=[cylinder, block],
    )
    prod_def = ifc.create_entity(
        "IfcProductDefinitionShape", Representations=[shape_rep]
    )

    stratum = ifc.create_entity(
        "IfcBuildingElementPart",
        GlobalId=new_guid(),
        Name=s["name"],
        ObjectPlacement=borehole_place,
        Representation=prod_def,
    )
    strata_entities.append(stratum)

# ----------------------------------------------------------------------
# Groundwater annotation (point at –2.3 m)
gw_point = ifc.create_entity("IfcCartesianPoint", (0.0, 0.0, -2.3))
geom_set = ifc.create_entity("IfcGeometricSet", Elements=[gw_point])
gw_rep = ifc.create_entity(
    "IfcShapeRepresentation",
    ContextOfItems=geom_context,
    RepresentationIdentifier="Annotation",
    RepresentationType="GeometricSet",
    Items=[geom_set],
)
gw_def = ifc.create_entity(
    "IfcProductDefinitionShape", Representations=[gw_rep]
)
groundwater = ifc.create_entity(
    "IfcAnnotation",
    GlobalId=new_guid(),
    Name="BH01_Grundwasser",
    ObjectPlacement=borehole_place,
    Representation=gw_def,
)

# ----------------------------------------------------------------------
# Aggregation relationships (hierarchy)
rel_proj_site = ifc.create_entity(
    "IfcRelAggregates",
    GlobalId=new_guid(),
    RelatingObject=project,
    RelatedObjects=[site],
)
rel_site_building = ifc.create_entity(
    "IfcRelAggregates",
    GlobalId=new_guid(),
    RelatingObject=site,
    RelatedObjects=[building],
)
rel_building_bh = ifc.create_entity(
    "IfcRelAggregates",
    GlobalId=new_guid(),
    RelatingObject=building,
    RelatedObjects=[borehole],
)
rel_bh_parts = ifc.create_entity(
    "IfcRelAggregates",
    GlobalId=new_guid(),
    RelatingObject=borehole,
    RelatedObjects=strata_entities + [groundwater],
)

# ----------------------------------------------------------------------
# Write IFC file to the virtual filesystem
filename = "geotech.ifc"
ifc.write(filename)

# ----------------------------------------------------------------------
# Inform the user
display(
    Markdown(
        f"**IFC file created:** `{filename}`\\n\\n"
        "The model now contains:\\n"
        "- Project **Baugrundmodell**\\n"
        "- Site **Baufeld A**\\n"
        "- Building **Baugrund** (acts as the geotechnical facility)\\n"
        "- Borehole proxy **BH01** (container for the strata)\\n"
        "- Three strata (fill, sand, clay) modelled as cylinders with surrounding blocks\\n"
        "- Groundwater annotation point at z = ‑2.3 m\\n\\n"
        "You can download the file and open it in any IFC viewer."
    )
)

output = {"viewer": [{"file": filename}]}
json.dumps(output)