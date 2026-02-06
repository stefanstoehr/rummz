import ifcopenshell
import ifcopenshell.api as api

ifc = ifcopenshell.file(schema="IFC4X3")

# Projekt, Site, Facility
project = api.run("root.create_entity", ifc, ifc_class="IfcProject", name="Baugrundmodell")
api.run("unit.assign_unit", ifc, length_units="METRE")
site = api.run("root.create_entity", ifc, ifc_class="IfcSite", name="Baufeld A")
facility = api.run("root.create_entity", ifc, ifc_class="IfcGeotechnicalFacility", name="Baugrund")

api.run("aggregate.assign_object", ifc, relating_object=project, product=site)
api.run("aggregate.assign_object", ifc, relating_object=site, product=facility)

# Bohrung BH01
bh01 = api.run("root.create_entity", ifc, ifc_class="IfcBorehole", name="BH01")
api.run("spatial.assign_container", ifc, relating_structure=facility, product=bh01)

# Hilfsfunktion für Schichten
def create_layer(ifc, borehole, name, z0, z1, rect_size):
    record = api.run("root.create_entity", ifc, ifc_class="IfcBoreholeRecord", name=f"{z0}-{z1}m {name}")
    api.run("spatial.assign_container", ifc, relating_structure=borehole, product=record)

    fp = api.run("root.create_entity", ifc, ifc_class="IfcFacilityPart", name=f"BH01_Schicht_{name}")
    api.run("spatial.assign_container", ifc, relating_structure=borehole, product=fp)

    stratum = api.run("root.create_entity", ifc, ifc_class="IfcGeotechnicalStratum", name=f"BH01_{name}")
    api.run("spatial.assign_container", ifc, relating_structure=fp, product=stratum)

    # Geometrie 1: Zylinder
    body1 = api.run(
        "geometry.add_extruded_area_solid",
        ifc,
        product=stratum,
        length=z1 - z0,
        profile="CIRCLE",
        radius=0.1,
        position=(0, 0, z0),
    )
    # Geometrie 2: Rechteck-Volumen
    body2 = api.run(
        "geometry.add_extruded_area_solid",
        ifc,
        product=stratum,
        length=z1 - z0,
        profile="RECTANGLE",
        xdim=rect_size,
        ydim=rect_size,
        position=(0, 0, z0),
    )

# Drei Schichten
create_layer(ifc, bh01, "Auffuellung", 0.0, 1.2, 2.0)
create_layer(ifc, bh01, "Sand",       1.2, 4.8, 3.0)
create_layer(ifc, bh01, "Ton",        4.8, 8.0, 4.0)

# Grundwasser als SurfaceFeature
gw = api.run("root.create_entity", ifc, ifc_class="IfcSurfaceFeature", name="BH01_Grundwasser")
api.run("spatial.assign_container", ifc, relating_structure=bh01, product=gw)
api.run(
    "geometry.add_extruded_area_solid",
    ifc,
    product=gw,
    length=0.05,
    profile="CIRCLE",
    radius=0.5,
    position=(0, 0, -2.3),
)

ifc.write("baugrund.ifc")
