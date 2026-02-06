### **IfcRoot**



IfcRoot bringt drei fundamentale **Eigenschaften** mit:



Entity			| Bedeutung

---

**IfcGloballyUniqueId**	| Eindeutige GUID

**Name**			| Kurzbezeichnung

**Description**		| Beschreibung



Von IfcRoot leiten sich drei **Hauptgruppen** ab:



**IfcObjectDefinition** → Alles, was ein Objekt oder eine Gruppe von Objekten ist



 	**IfcObject** (physische oder abstrakte Objekte)

 	**IfcTypeObject** (Typen/Katalogeinträge)



**IfcPropertyDefinition** → Alles, was Eigenschaften definiert



 	**IfcPropertySet**

 	**IfcElementQuantity**



**IfcRelationship** → Alles, was Beziehungen zwischen Objekten\* herstellt



 	z. B. IfcRelAggregates, IfcRelContainedInSpatialStructure, IfcRelDefinesByProperties

### 

### **IfcObject**



**IfcObject** hat fünf Hauptkategorien:



Kategorie	| Beispiele			| Zweck

---

**IfcActor**	| Personen, Firmen		| Beteiligte

**IfcControl**	| Kosten, Aufgaben		| Steuernde Elemente

**IfcGroup**	| Gruppen			| Logische Gruppierung

**IfcProcess**	| Vorgänge, Abläufe		| Bauprozesse

**IfcProduct**	| Bauteile, Räume, Achsen	| Alles, was im Modell „existiert“



Die wichtigste Kategorie ist **IfcProduct**, denn hier liegen die physischen Bauteile.

### 

### **IfcProduct**



**IfcProduct** enthält alles, was im Raum steht oder eine geometrische Repräsentation hat:



**IfcElement** 		(Wände, Türen, Träger, Rohre, …)

**IfcSpatialElement** 	(Gebäude, Geschosse, Räume)

**IfcAnnotation** 		(2D‑Elemente)

**IfcPositioningElement** 	(Achsen, Bezugssysteme)

### 

### **SPATIAL STRUCTURE**



Die räumliche Hierarchie ist zentral für jedes IFC‑Modell (4x3):



IfcProject

 └── IfcSite

      └── IfcFacility

           └── IfcFacilityPart

                └── IfcBuilding / IfcBridge / IfcRoad / IfcGeomodel (je nach Domäne)

                     └── IfcBuildingStorey ???

                          └── IfcSpace ???



In IFC 4x3 wurde die Struktur für Infrastruktur erweitert:



**IfcFacility** 	= übergeordnete Anlage (Straße, Schiene, Brücke)

**IfcFacilityPart**	= logische Unterteilung (Abschnitt, Bauwerksteil)

### 

### **IfcRelationship**



Beziehungen sind das Rückgrat des IFC‑Modells. Die wichtigsten Relationship‑Typen:



Strukturierende Beziehungen



 	**IfcRelAggregates** 			→ „besteht aus“ (z. B. Gebäude besteht aus Geschossen)

 	**IfcRelContainedInSpatialStructure** 	→ „ist enthalten in“ (z. B. Wand ist in Geschoss enthalten)



Eigenschaften zuweisen

 

 	**IfcRelDefinesByProperties** 		→ Objekt erhält ein PropertySet

 	**IfcRelDefinesByType** 			→ Objekt erhält einen Typ (z. B. Türtyp)



Logische Beziehungen



 	**IfcRelConnectsElements** 			→ Verbindung zwischen Bauteilen (z. B. Wand–Stütze)

 	**IfcRelSequence** 				→ Prozessabläufe (Bauzeiten)

### 

### **PROPERTIES**



Eigenschaften werden in Property Sets (Psets) organisiert.



**Pset\_WallCommon**

**Pset\_BridgePartCommon**

**Pset\_RoadSegmentCommon**



Ein PropertySet enthält:



**IfcPropertySingleValue**

**IfcPropertyEnumeratedValue**

**IfcPropertyListValue**

usw.

### 

### **IfcRepresentation**



Die Geometrie eines Produkts liegt in:



**IfcProductDefinitionShape**

 └── enthält **IfcRepresentation**

     └── z. B. **IfcShapeRepresentation**

 	 └── z. B. **IfcExtrudedAreaSolid, IfcFacetedBrep, IfcCurveSegment**

### 

### **IfcObjectPlacement**



Jedes Produkt hat eine Position:



**IfcLocalPlacement** (lokale Koordinatensysteme)

**IfcGridPlacement**

**IfcLinearPlacement** (neu für Infrastruktur – entlang einer Achse)





### **GRAFISCHE ÜBERSICHT (ALT)**



IfcProject "Baugrundmodell"

 └── IfcSite "Baufeld A"

      └── IfcGeotechnicalFacility "Baugrund"

           ├── IfcBorehole "BH01"

           │     ├── IfcBoreholeRecord (0.0–1.2 m: Auffüllung)

           │     ├── IfcBoreholeRecord (1.2–4.8 m: Sand)

           │     ├── IfcBoreholeRecord (4.8–8.0 m: Ton)

           │

           │     ├── IfcFacilityPart "BH01\_Schicht\_1"

           │     │     └── IfcGeotechnicalStratum "BH01\_Auffüllung"

           │     │           └── Geometrie: lokales Volumen

           │     │

           │     ├── IfcFacilityPart "BH01\_Schicht\_2"

           │     │     └── IfcGeotechnicalStratum "BH01\_Sand"

           │     │           └── Geometrie: lokales Volumen

           │     │

           │     └── IfcFacilityPart "BH01\_Schicht\_3"

           │           └── IfcGeotechnicalStratum "BH01\_Ton"

           │                 └── Geometrie: lokales Volumen

           │

           ├── IfcBorehole "BH02"

           │     ├── IfcBoreholeRecord (0.0–0.8 m: Oberboden)

           │     ├── IfcBoreholeRecord (0.8–3.9 m: Sand)

           │     ├── IfcBoreholeRecord (3.9–7.5 m: Ton)

           │

           │     ├── IfcFacilityPart "BH02\_Schicht\_1"

           │     │     └── IfcGeotechnicalStratum "BH02\_Oberboden"

           │     │           └── Geometrie: lokales Volumen

           │     │

           │     ├── IfcFacilityPart "BH02\_Schicht\_2"

           │     │     └── IfcGeotechnicalStratum "BH02\_Sand"

           │     │           └── Geometrie: lokales Volumen

           │     │

           │     └── IfcFacilityPart "BH02\_Schicht\_3"

           │           └── IfcGeotechnicalStratum "BH02\_Ton"

           │                 └── Geometrie: lokales Volumen

           │

           └── IfcSurfaceFeature "Grundwasser"

                 └── Geometrie: Surface at -2.3 m

### 

### **GRAFISCHE ÜBERSICHT FÜR IFC4x3\_ADD2 (NEU)**



IfcProject "Baugrundmodell"

 └── IfcSite "Baufeld A"

      └── IfcGeotechnicalFacility "Baugrund"

           └── IfcBorehole "BH01"

                 ├── IfcBoreholeRecord (0.0–1.2 m: Auffüllung)

                 │     └── IfcFacilityPart "BH01\_Schicht\_1"

                 │           └── IfcGeotechnicalStratum "BH01\_Auffüllung"

                 │                 ├── Geometrie 1: Schichtbohrzylinder

                 │                 └── Geometrie 2: Schichtausbreitungsvolumen

                 │

                 ├── IfcBoreholeRecord (1.2–4.8 m: Sand)

                 │     └── IfcFacilityPart "BH01\_Schicht\_2"

                 │           └── IfcGeotechnicalStratum "BH01\_Sand"

                 │                 ├── Geometrie 1: Schichtbohrzylinder

                 │                 └── Geometrie 2: Schichtausbreitungsvolumen

                 │

                 ├── IfcBoreholeRecord (4.8–8.0 m: Ton)

                 │     └── IfcFacilityPart "BH01\_Schicht\_3"

                 │           └── IfcGeotechnicalStratum "BH01\_Ton"

                 │                 ├── Geometrie 1: Schichtbohrzylinder

                 │                 └── Geometrie 2: Schichtausbreitungsvolumen

                 │

                 └── IfcSurfaceFeature "BH01\_Grundwasser"

                       └── Geometrie: Punkt/kleine Fläche bei z = -2.3 m

### 

### **TEXTUELLES IFC-STRUKTURMODELL FÜR IFC4x3\_ADD2 (OHNE STEP-SYNTAX)**



**IfcProject**

&nbsp;	

&nbsp;	Name: Baugrundmodell

&nbsp;	enthält: **IfcSite**



**IfcSite**



&nbsp;	Name: Baufeld A

&nbsp;	enthält: **IfcGeotechnicalFacility**



**IfcGeotechnicalFacility**



&nbsp;	Name: Baugrund

&nbsp;	enthält: **IfcBorehole** BH01 (weitere Bohrungen optional)



**IfcBorehole** "BH01" (exemplarisch nur 1x)



&nbsp;	Standort: Koordinate (x, y)

&nbsp;	enthält: **IfcBoreholeRecord** 1 (Auffüllung)

&nbsp;	enthält: **IfcBoreholeRecord** 2 (Sand)

&nbsp;	enthält: **IfcBoreholeRecord** 3 (Ton)

&nbsp;	enthält: **IfcSurfaceFeature** "BH01\_Grundwasser"



**IfcBoreholeRecord** 1 (exemplarisch nur 1x statt 3x)



&nbsp;	Tiefe oben: 0.0 m

&nbsp;	Tiefe unten: 1.2 m

&nbsp;	Material: Auffüllung

&nbsp;	enthält: IfcFacilityPart "BH01\_Schicht\_1"



**IfcFacilityPart** "BH01\_Schicht\_1" (exemplarisch nur 1x statt 3x)



&nbsp;	beschreibt: Schicht 1 der Bohrung BH01

&nbsp;	enthält: **IfcGeotechnicalStratum** "BH01\_Auffüllung"



**IfcGeotechnicalStratum** "BH01\_Auffüllung" (exemplarisch nur 1x statt 3x)



&nbsp;	Material: Auffüllung

&nbsp;	enthält zwei Geometrien:

&nbsp;	Geometrie 1: Schichtbohrzylinder (zylindrischer oder prismatischer Körper entlang der Bohrung)

&nbsp;	Geometrie 2: Schichtausbreitungsvolumen (lokales 3D‑Volumen um die Bohrung)

### 

### **GRAFISCHE ÜBERSICHT FÜR IFC4 (NEU)**



IfcProject "Baugrundmodell"

&nbsp;└── IfcSite "Baufeld A"

&nbsp;     └── IfcBuildingElementProxy "BH01" (ObjectType = "Borehole")

&nbsp;           ├── Geometrie: Zylinder (Radius 0.1 m, Höhe 3 m)

&nbsp;           │

&nbsp;           ├── IfcPropertySet "BH01\_Record\_1"

&nbsp;           │     ├── TopDepth = 0.0

&nbsp;           │     ├── BottomDepth = 1.0

&nbsp;           │     └── Material = "Erde"

&nbsp;           │

&nbsp;           ├── IfcGroup "BH01\_Schicht\_1"

&nbsp;           │     └── IfcBuildingElementProxy "BH01\_Erde" (ObjectType = "Stratum")

&nbsp;           │           ├── Geometrie 1: Zylinder (0.0–1.0 m)

&nbsp;           │           └── Geometrie 2: Rechteck 2×2 m (0.0–1.0 m)

&nbsp;           │

&nbsp;           ├── IfcPropertySet "BH01\_Record\_2"

&nbsp;           │     ├── TopDepth = 1.0

&nbsp;           │     ├── BottomDepth = 2.0

&nbsp;           │     └── Material = "Sand"

&nbsp;           │

&nbsp;           ├── IfcGroup "BH01\_Schicht\_2"

&nbsp;           │     └── IfcBuildingElementProxy "BH01\_Sand" (ObjectType = "Stratum")

&nbsp;           │           ├── Geometrie 1: Zylinder (1.0–2.0 m)

&nbsp;           │           └── Geometrie 2: Rechteck 3×3 m (1.0–2.0 m)

&nbsp;           │

&nbsp;           ├── IfcPropertySet "BH01\_Record\_3"

&nbsp;           │     ├── TopDepth = 2.0

&nbsp;           │     ├── BottomDepth = 3.0

&nbsp;           │     └── Material = "Kies"

&nbsp;           │

&nbsp;           ├── IfcGroup "BH01\_Schicht\_3"

&nbsp;           │     └── IfcBuildingElementProxy "BH01\_Kies" (ObjectType = "Stratum")

&nbsp;           │           ├── Geometrie 1: Zylinder (2.0–3.0 m)

&nbsp;           │           └── Geometrie 2: Rechteck 4×4 m (2.0–3.0 m)

&nbsp;           │

&nbsp;           └── Spatial Containment:

&nbsp;                 └── IfcRelContainedInSpatialStructure → IfcSite



