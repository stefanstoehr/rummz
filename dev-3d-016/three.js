import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Delaunay } from 'd3-delaunay';

function updateVisualisation () {

  // Hilfsfunktion: Entfernt alle Meshes aus der Szene und leert den Cache
  function disposeObject(obj) {
    // Falls das Objekt eine Geometrie hat, entsorgen
    if (obj.geometry) obj.geometry.dispose();

    // Falls das Objekt ein Material hat, entsorgen
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(mat => mat.dispose());
      } else {
        obj.material.dispose();
      }
    }
    // Falls es eine Gruppe ist, rekursiv über Kinder
    if (obj.children) {
      obj.children.forEach(child => disposeObject(child));
    }
  }

  function clearEntireScene() {
    while (scene.children.length > 0) {
      const obj = scene.children[0];
      scene.remove(obj);
      disposeObject(obj);
    }
  }

  // Scene + renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeaf0f6);

  const container = document.getElementById('dashboard-map');
  const renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  clearEntireScene();

  // Camera
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth/container.clientHeight, 0.1, 1000);
  scene.add(camera);// camera.position.set(200, 200, 200);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Lights
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  //dir.position.set(200,300,100);
  scene.add(dir);
  scene.add(new THREE.AmbientLight(0xffffff,0.4));

  // Bohrkerndaten
  const cardsData = [
      {
          "id": "card-1759150384263-0",
          "title": "RKS1",
          "coords": {
              "lat": 51.76749861403783,
              "lng": 14.321360745065757
          },
          "nhn": 63.5,
          "layers": [
              {
                  "id": "card-1759150384263-0-layer-1-1759150384263",
                  "name": "Erde",
                  "height": 80,
                  "color": "#c69262"
              },
              {
                  "id": "card-1759150384263-0-layer-2-1759150556849",
                  "name": "Sand",
                  "height": 50,
                  "color": "#fff700"
              },
              {
                  "id": "card-1759150384263-0-layer-3-1759150585915",
                  "name": "Wasser",
                  "height": 70,
                  "color": "#0080ff"
              }
          ],
          "initialView": null
      },
      {
          "id": "card-1759150643288-1",
          "title": "RKS2",
          "coords": {
              "lat": 51.767033840768775,
              "lng": 14.32125966599984
          },
          "nhn": 63.2,
          "layers": [
              {
                  "id": "card-1759150643288-1-layer-1-1759150643288",
                  "name": "Erde",
                  "height": 15,
                  "color": "#c69262"
              },
              {
                  "id": "card-1759150643288-1-layer-2-1759150664020",
                  "name": "Kies",
                  "height": 56,
                  "color": "#ff7b00"
              },
              {
                  "id": "card-1759150643288-1-layer-3-1759150670051",
                  "name": "Sand",
                  "height": 54,
                  "color": "#fff700"
              },
              {
                  "id": "card-1759150643288-1-layer-4-1759150674425",
                  "name": "Wasser",
                  "height": 20,
                  "color": "#0080ff"
              }
          ],
          "initialView": {
              "center": {
                  "lat": 51.766983379342484,
                  "lng": 14.320456784723097
              },
              "zoom": 17
          }
      },
      {
          "id": "card-1759150758907-2",
          "title": "RKS3",
          "coords": {
              "lat": 51.76652258464567,
              "lng": 14.321107216439064
          },
          "nhn": 64,
          "layers": [
              {
                  "id": "card-1759150758907-2-layer-1-1759150758907",
                  "name": "Asphalt",
                  "height": 20,
                  "color": "#808080"
              },
              {
                  "id": "card-1759150758907-2-layer-2-1759150788608",
                  "name": "Kies",
                  "height": 50,
                  "color": "#ff7b00"
              },
              {
                  "id": "card-1759150758907-2-layer-3-1759150807930",
                  "name": "Wasser",
                  "height": 89,
                  "color": "#0080ff"
              }
          ],
          "initialView": {
              "center": {
                  "lat": 51.766983379342484,
                  "lng": 14.32045876979828
              },
              "zoom": 17
          }
      },
      {
          "id": "card-1759150835357-3",
          "title": "RKS4",
          "coords": {
              "lat": 51.76647610652919,
              "lng": 14.320196814341875
          },
          "nhn": 62.87,
          "layers": [
              {
                  "id": "card-1759150835357-3-layer-1-1759150835357",
                  "name": "Erde",
                  "height": 43,
                  "color": "#c69262"
              },
              {
                  "id": "card-1759150835357-3-layer-2-1759150875407",
                  "name": "Kies",
                  "height": 50,
                  "color": "#ff7b00"
              },
              {
                  "id": "card-1759150835357-3-layer-3-1759150897929",
                  "name": "Sand",
                  "height": 99,
                  "color": "#fff700"
              }
          ],
          "initialView": {
              "center": {
                  "lat": 51.766983379342484,
                  "lng": 14.32045876979828
              },
              "zoom": 17
          }
      },
      {
          "id": "card-1759150924074-4",
          "title": "RKS5",
          "coords": {
              "lat": 51.766863865309084,
              "lng": 14.320163677531738
          },
          "nhn": 63.1,
          "layers": [
              {
                  "id": "card-1759150924074-4-layer-1-1759150924074",
                  "name": "Asphalt",
                  "height": 56,
                  "color": "#808080"
              },
              {
                  "id": "card-1759150924074-4-layer-2-1759150973943",
                  "name": "Erde",
                  "height": 70,
                  "color": "#c69262"
              },
              {
                  "id": "card-1759150924074-4-layer-3-1759150995084",
                  "name": "Sand",
                  "height": 34,
                  "color": "#fff700"
              }
          ],
          "initialView": {
              "center": {
                  "lat": 51.766983379342484,
                  "lng": 14.32045876979828
              },
              "zoom": 17
          }
      },
      {
          "id": "card-1759151019340-5",
          "title": "RKS6",
          "coords": {
              "lat": 51.76738175716856,
              "lng": 14.32007788907888
          },
          "nhn": 63.8,
          "layers": [
              {
                  "id": "card-1759151019340-5-layer-1-1759151019340",
                  "name": "Erde",
                  "height": 45,
                  "color": "#c69262"
              },
              {
                  "id": "card-1759151019340-5-layer-2-1759151124415",
                  "name": "Wasser",
                  "height": 23,
                  "color": "#0080ff"
              },
              {
                  "id": "card-1759151019340-5-layer-3-1759151165445",
                  "name": "Kies",
                  "height": 140,
                  "color": "#ff7b00"
              }
          ],
          "initialView": {
              "center": {
                  "lat": 51.766983379342484,
                  "lng": 14.32045876979828
              },
              "zoom": 17
          }
      },
      {
          "id": "card-1759151210206-6",
          "title": "RKS7",
          "coords": {
              "lat": 51.76753845152393,
              "lng": 14.320755079859207
          },
          "nhn": 62.9,
          "layers": [
              {
                  "id": "card-1759151210206-6-layer-1-1759151210206",
                  "name": "Asphalt",
                  "height": 15,
                  "color": "#808080"
              },
              {
                  "id": "card-1759151210206-6-layer-2-1759151254828",
                  "name": "Erde",
                  "height": 65,
                  "color": "#c69262"
              },
              {
                  "id": "card-1759151210206-6-layer-3-1759151272794",
                  "name": "Sand",
                  "height": 41,
                  "color": "#fff700"
              }
          ],
          "initialView": {
              "center": {
                  "lat": 51.766983379342484,
                  "lng": 14.32045876979828
              },
              "zoom": 17
          }
      }
  ];

  // Validierung der Bohrkerndaten

  function validateBorehole(borehole) {
    // Grundlegende Felder prüfen
    if (
      //typeof borehole.id !== "string" ||
      //typeof borehole.title !== "string" ||
      typeof borehole.coords !== "object" ||
      typeof borehole.nhn !== "number" ||
      !Array.isArray(borehole.layers) ||
      borehole.layers.length === 0
    ) {
      return false;
    }
    // Koordinaten prüfen
    if (
      typeof borehole.coords.lat !== "number" ||
      typeof borehole.coords.lng !== "number"
    ) {
      return false;
    }
    // Jede Schicht prüfen
    for (const layer of borehole.layers) {
      if (
        //typeof layer.id !== "string" ||
        typeof layer.name !== "string" ||
        typeof layer.height !== "number" ||
        //layer.height <= 0 ||
        typeof layer.color !== "string"
      ) {
        return false;
      }
    }
    return true;
  }

  function validatecardsData(cardsData) {
    return cardsData.every(validateBorehole);
  }
    
    // Beispiel-Nutzung:
    if (!validatecardsData(cardsData)) {
      //alert("Fehler: Mindestens ein Bohrkern ist ungültig!");
    } else {
      // Volumengenerierung kann fehlerfrei ablaufen
      //clearSceneAndCache()
      // ENDE Validierung der Bohrkerndaten

      /////////////////////////////////////////////////////////////////////////


      // Geografische Mittelpunkt (Zentrum) aller Bohrungen
      const refLat = cardsData.reduce((s,b)=>s+b.coords.lat,0)/cardsData.length;
      const refLon = cardsData.reduce((s,b)=>s+b.coords.lng,0)/cardsData.length;

      // Umrechnung Lat/Lon in Meter (einfache Approximation)
      // 1° Lat = ca. 111320 m
      const metersPerDegLat = 111320;

      //- Umrechnung von Grad in Radiant:
      // 1° Lon = ca. 111320 * cos(Lat) m
      const metersPerDegLon = 111320 * Math.cos(refLat * Math.PI/180);

      // Funktion zur Umrechnung Lat/Lon in X/Z (Meter)
      function latLonToXZ(lat, lon) {
        const x = (lon - refLon) * metersPerDegLon;
        const z = (lat - refLat) * metersPerDegLat;
        return { x, z };
      }

      // Ground grid (XZ plane) -- Three.js uses Y up
      // Grid soll mittig um die Bohrungen liegen
      const boreholeCenters = cardsData.map(bh => {
        const depth = bh.layers.reduce((sum, layer) => sum + layer.height / 100, 0);
        return bh.nhn - depth / 2;
      });
      const minNHN = Math.min(...boreholeCenters);
      const maxNHN = Math.max(...boreholeCenters);
      const midNHN = (minNHN + maxNHN) / 2;

      // 1. X/Z-Positionen der Bohrkerne berechnen iVm Referenzpunkt
      const positions = cardsData.map(bh => latLonToXZ(bh.coords.lat, bh.coords.lng));

      // 2. Min/Max für X und Z finden
      // und Mittelpunkt berechnen
      const xs = positions.map(p => p.x);
      const zs = positions.map(p => p.z);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minZ = Math.min(...zs);
      const maxZ = Math.max(...zs);
      const { x: centerX, z: centerZ } = latLonToXZ(refLat, refLon);

      // 3. Grid-Größe bestimmen (größte Ausdehnung + Puffer)
      const extentX = maxX - minX;
      const extentZ = maxZ - minZ;
      const minGridSize = 20; // oder ein sinnvoller Wert
      const gridSize = Math.max(minGridSize, Math.max(extentX, extentZ) * 1.5);

      // 4. Divisionen bestimmen (z.B. alle 20 Meter eine Linie, mindestens 10)
      const divisions = Math.max(5, Math.round(gridSize / 20));
      //if (divisions % 2 === 0) divisions += 1; // sicherstellen, dass divisions ungerade ist

      // 5. Grid erzeugen und mittig platzieren
      //const colorCenterLine = 0xdfdfdf;
      const colorGrid = 0xdfdfdf;
      const gridHelper = new THREE.GridHelper(gridSize, divisions, colorGrid);
      gridHelper.position.y = midNHN;
      scene.add(gridHelper);
      //geometryCache.push(gridHelper); // Grid zum Cache hinzufügen

      // Kamera automatisch zentrieren und skalieren
      const maxExtent = Math.max(maxX - minX, maxZ - minZ);
      const minDistance = 30; // oder ein sinnvoller Wert
      const distance = Math.max(minDistance, maxExtent * 1.5);

      camera.position.set(centerX + distance, midNHN + distance, centerZ + distance);
      dir.position.set(centerX + distance, midNHN + distance, centerZ + distance);// Lichtposition an Kamera binden
      camera.lookAt(centerX, midNHN, centerZ);

      controls.target.set(centerX, midNHN, centerZ);
      controls.update();

      // Axes helper (groß)
      const axesSize = gridSize / 5;
      const axesHelper = new THREE.AxesHelper(axesSize);
      axesHelper.position.set(centerX, midNHN, centerZ);
      scene.add(axesHelper);
      //geometryCache.push(axesHelper); // Achsen zum Cache hinzufügen

      ////////////////ADD BOREHOLES TO SCENE///////////////////////////////////
      
      // create stacked cylinders along Y (up) -- top is at Y=0 (ground)
      function createBoreholeGroup(x, z, layers, radius=2.8) {
        const g = new THREE.Group();
        let currentDepth = 0;
        layers.forEach((layer, idx) => {
          const h = layer.height / 100; // <-- Umrechnung von cm in m
          const geom = new THREE.CylinderGeometry(radius, radius, h, 32);
          const mat = new THREE.MeshStandardMaterial({color: layer.color, roughness:0.8, metalness:0.1});
          const mesh = new THREE.Mesh(geom, mat);
          mesh.position.set(x, -(currentDepth + h/2), z);
          mesh.userData = { layerIndex: idx, thickness: h, borehole: null };
          g.add(mesh);
          //geometryCache.push(mesh); // Mesh zum Cache hinzufügen
          currentDepth += h;
        });
        return g;
      }

      // add cardsData to scene
      cardsData.forEach(bh=>{
        const p = latLonToXZ(bh.coords.lat, bh.coords.lng); // <-- geändert
        const grp = createBoreholeGroup(p.x, p.z, bh.layers);
        grp.name = bh.id;
        grp.position.y = bh.nhn;
        scene.add(grp);
        //geometryCache.push(grp);
      });

      ////////////////ADD VOLUMES TO SCENE////////////////////
      
      // Voronoi vorbereiten
      const points = cardsData.map(b => {
        const { x, z } = latLonToXZ(b.coords.lat, b.coords.lng);
        return [x, z];
      });

      const delaunay = Delaunay.from(points); // ✅ korrekt

      const halfGrid = gridSize / 2;
      const gridMinX = centerX - halfGrid;
      const gridMaxX = centerX + halfGrid;
      const gridMinZ = centerZ - halfGrid;
      const gridMaxZ = centerZ + halfGrid;

      const voronoi = delaunay.voronoi([gridMinX, gridMinZ, gridMaxX, gridMaxZ]);

      function sortPolygonPoints(points) {
        // Mittelpunkt berechnen
        const center = points.reduce(
          (acc, [x, z]) => {
            acc.x += x;
            acc.z += z;
            return acc;
          },
          { x: 0, z: 0 }
        );
        center.x /= points.length;
        center.z /= points.length;

        // Punkte nach Winkel sortieren
        return [...points].sort(([xA, zA], [xB, zB]) => {
          const angleA = Math.atan2(zA - center.z, xA - center.x);
          const angleB = Math.atan2(zB - center.z, xB - center.x);
          return angleA - angleB; // gegen den Uhrzeigersinn
        });
      }

      // Modell schrittweise erzeugen
      async function buildModel() {
        for (let i = 0; i < cardsData.length; i++) {
          const borehole = cardsData[i];
          const rawCell = voronoi.cellPolygon(i);
          const cell = sortPolygonPoints(rawCell);

          if (!cell) continue;

          let yOffset = borehole.nhn;

          for (let layer of borehole.layers) {
            const shape = new THREE.Shape();
            cell.forEach(([cx, cz], idx) => {
              if (idx === 0) shape.moveTo(cx, cz);
              else shape.lineTo(cx, cz);
            });

            const geometry = new THREE.ExtrudeGeometry(shape, {
              depth: layer.height / 100,
              bevelEnabled: false
            });
            geometry.rotateX(Math.PI / 2); // Rotate to make Y up

            const material = new THREE.MeshStandardMaterial({
              color: layer.color,
              transparent: true,
              opacity: 0.7,
              polygonOffset: true,
              polygonOffsetFactor: 1,
              polygonOffsetUnits: 1
            });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(0, yOffset, 0);

            scene.add(mesh);
            //geometryCache.push(mesh); // Mesh zum Cache hinzufügen

            yOffset -= layer.height / 100; // slight overlap to avoid gaps
          }
        }
      }
      buildModel();
    };

  // Raycaster für Klick-Interaktion
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let isDragging = false;
  let mouseDownPos = { x: 0, y: 0 };
  const dragThreshold = 5; // Pixel

  container.addEventListener('mousedown', (event) => {
    isDragging = false;
    mouseDownPos = { x: event.clientX, y: event.clientY };
  });

  container.addEventListener('mousemove', (event) => {
    const dx = event.clientX - mouseDownPos.x;
    const dy = event.clientY - mouseDownPos.y;
    if (Math.sqrt(dx * dx + dy * dy) > dragThreshold) {
      isDragging = true;
    }
  });

  container.addEventListener('mouseup', (event) => {
    if (!isDragging) {
      onClick(event); // Nur bei echtem Klick
    }
  });

  function onClick(event) {
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = - (event.clientY / container.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const obj = intersects[0].object;
      alert('Y-Position: ' + intersects[0].point.y.toFixed(3));
      console.log("Clicked object:", obj);
    }
  }

  // End Raycaster

  /*
  window.addEventListener('resize', onWindowResize,false);
  function onWindowResize(){
    camera.aspect = container.clientWidth/container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
    */

  function animate(){
    requestAnimationFrame(animate);
    //controls.update();
    renderer.render(scene, camera);
  }
  animate();

};

updateVisualisation();