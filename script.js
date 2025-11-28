document.addEventListener("DOMContentLoaded", function() {

  // === TRABAJOS ===
  // === TRABAJOS ===
  const trabajosContainer = document.getElementById("contenedorTrabajos");

  if (trabajosContainer) {
    Papa.parse("Listas/publicaciones.csv", {
      download: true,
      header: true,
      complete: function (results) {
        // Filtrar los activos y ordenar por 'Orden'
        const trabajos = results.data
          .filter(t => (t.activo === "1" || t.activo === 1) && t.Orden)
          .sort((a, b) => Number(a.Orden) - Number(b.Orden)) // orden ascendente
          .slice(0, 3); // solo los primeros 3

        // Limpiar contenedor
        trabajosContainer.innerHTML = "";

        // Crear los elementos
        trabajos.forEach(trabajo => {
          if (!trabajo.N) return;
          const trabajoElement = document.createElement("div");
          trabajoElement.classList.add("trabajo");
          trabajoElement.innerHTML = `
            <img src="./Imagenes/Proyectos/${trabajo.N}.png" alt="${trabajo.titulo}">
            <div class="overlay">
              <p class="descripcion">
                ${trabajo.descripcion || ""} <br>
                ${trabajo.Equipo ? `<br><strong>Equipo:</strong> ${trabajo.Equipo}` : ""}
              </p>
            ${
              trabajo.link
                ? `<a href="${trabajo.link}" target="_blank" class="link-flecha">➜</a>`
                : ""
            }
            </div>
            <h3 class="tema">${trabajo.tema || ""}</h3>
            <h2>${trabajo.titulo || ""}</h2>
          `;
          trabajosContainer.appendChild(trabajoElement);
        });
      },
      error: function (err) {
        console.error("Error leyendo publicaciones.csv:", err);
      }
    });
  }

  // === DIVULGACIÓN (inicio, con CSV==1 o 0) ===
  const newsletterContainer = document.getElementById("newsletterContainer");
 // const notasContainer = document.getElementById("notasContainer");
  if (newsletterContainer) {
    Papa.parse("Listas/divulgacion.csv", {
      download: true,
      header: true,
      complete: function(results) {
      const data = results.data.filter(nl => nl.Titulo);

      const newsletterItems = data
          .filter(nl => nl.Universo === "CSV")
          .sort((a, b) => a.N - b.N)   // ordena de menor a mayor según N
          .slice(0, 3);                // toma los primeros 3

    //    const notasItems = data.filter(nl => nl.Universo == "Propias").slice(0, 1);

        const crearItemHTML = (nl) => `
          <div class="newsletter-item">
            <div class="imagen-container">
              <img src="Imagenes/publicaciones_propias/${nl.Imagen}" alt="${nl.Titulo}">
              <div class="overlay">
                <a href="${nl.Link}" target="_blank" class="link-flecha">➜</a>
              </div>
            </div>
            <h2>${nl.Titulo}</h2>
            <h4>${nl.Subtitulo || ""}</h4>
          </div>
        `;

        newsletterContainer.innerHTML = "";
  //      notasContainer.innerHTML = "";
        newsletterItems.forEach(nl => newsletterContainer.insertAdjacentHTML("beforeend", crearItemHTML(nl)));
    //    notasItems.forEach(nl => notasContainer.insertAdjacentHTML("beforeend", crearItemHTML(nl)));
      }
    });
  }

// === PUBLICACIONES (página publicaciones.html) ===
const contenedor = document.getElementById("todasPublicaciones");

if (contenedor) {
  Papa.parse("Listas/publicaciones.csv", {
    download: true,
    header: true,
    complete: function (results) {
      // Filtrar las filas válidas
      const publicaciones = results.data
        .filter(pub => pub.titulo && pub.activo === "1") // solo activas
        .sort((a, b) => Number(a.Orden) - Number(b.Orden)); // orden ascendente

      // Limpiar contenedor
      contenedor.innerHTML = "";

      // Crear cada ítem
      publicaciones.forEach(pub => {
        const item = document.createElement("div");
        item.classList.add("itemListado");
        item.innerHTML = `
          <img src="./Imagenes/Proyectos/${pub.N}.png" alt="${pub.titulo}">
          <div class="itemTexto">
            <h2>${pub.titulo}</h2>
            <h4>${pub.descripcion || ""}</h4>
            <h5>${pub.Equipo || ""}</h5>
          </div>
          <a href="${pub.link}" target="_blank" class="itemLink">➜</a>
        `;
        contenedor.appendChild(item);
      });
    },
    error: function (err) {
      console.error("Error leyendo publicaciones.csv:", err);
    }
  });
}

// === DIVULGACIÓN (página divulgacion.html) ===
const contenedorDivulgacion = document.getElementById("todasDivulgaciones");

if (contenedorDivulgacion) {
  const filtroContainer = document.createElement("div");
  filtroContainer.classList.add("filtroDivulgacion");

  // Botones de filtro
  const botones = [
    { id: "todas", texto: "Todas" },
    { id: "propias", texto: "Propias" },
    { id: "participaciones", texto: "Participaciones" }
  ];

  botones.forEach(btnInfo => {
    const btn = document.createElement("button");
    btn.textContent = btnInfo.texto;
    btn.id = btnInfo.id;
    btn.classList.add("boton-filtro");
    if (btnInfo.id === "todas") btn.classList.add("activo");
    filtroContainer.appendChild(btn);
  });

  // Insertamos los filtros arriba del contenedor de divulgaciones
  contenedorDivulgacion.parentNode.insertBefore(filtroContainer, contenedorDivulgacion);

  // Función auxiliar: normaliza texto (quita tildes y pasa a minúsculas)
  function normalize(str) {
    return str
      ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
      : "";
  }

  // Cargar los datos
  Papa.parse("Listas/divulgacion.csv", {
    download: true,
    header: true,
    complete: function (results) {
      // Mapeo del orden deseado para "Universo"
      const ordenUniverso = {
        "CSV": 1,
        "Propias": 2,
        "Participaciones": 3,
        "Participación": 3, // por si llega con tilde
        "participacion": 3
      };

      const todasLasNotas = results.data
        .filter(n => n.Titulo)
        .sort((a, b) => {
          // Normalizamos "Universo"
          const ua = (a.Universo || "").trim();
          const ub = (b.Universo || "").trim();

          // Primero orden por universo según tu ranking
          const ordenA = ordenUniverso[ua] ?? 99;
          const ordenB = ordenUniverso[ub] ?? 99;

          if (ordenA !== ordenB) return ordenA - ordenB;

          // Segundo orden por "Orden Nat" descendente
          const oa = Number(a["Orden Nat"]) || 0;
          const ob = Number(b["Orden Nat"]) || 0;

          return ob - oa; // descendente
        });
      function renderizar(filtro) {
        contenedorDivulgacion.innerHTML = "";

        let filtradas = todasLasNotas;

        if (filtro === "propias") {
          filtradas = todasLasNotas.filter(n => {
            const r = normalize(n["Realiza"] || n.Realizacion || "");
            return r.includes("propia");
          });
        } else if (filtro === "participaciones") {
          filtradas = todasLasNotas.filter(n => {
            const r = normalize(n["Realiza"] || n.Realizacion || "");
            return r.includes("particip");
          });
        }

        filtradas.forEach(nl => {
          const item = document.createElement("div");
          item.classList.add("itemListado");
          item.innerHTML = `
            <img src="Imagenes/publicaciones_propias/${nl.Imagen}" alt="${nl.Titulo}">
            <div class="itemTexto">
              <h2>${nl.Titulo}</h2>
              <h4>${nl.Subtitulo || ""}</h4>
              <h5>${nl.Medio || ""}</h5>
            </div>
            <a href="${nl.Link}" target="_blank" class="itemLink">➜</a>
          `;
          contenedorDivulgacion.appendChild(item);
        });
      }

      // Render inicial
      renderizar("todas");

      // Eventos de filtro
      filtroContainer.querySelectorAll(".boton-filtro").forEach(btn => {
        btn.addEventListener("click", () => {
          filtroContainer.querySelectorAll(".boton-filtro").forEach(b => b.classList.remove("activo"));
          btn.classList.add("activo");
          renderizar(btn.id);
        });
      });
    },
    error: function (err) {
      console.error("Error leyendo propios_divulgacion.csv:", err);
    }
  });
}

  // … (docencia, instituciones, contacto, CV, etc.) …
});


// DOCENCIA
const docencia = [
  {
    universidad: "Universidad de Buenos Aires",
    materia: "Tópicos de Economía Urbana",
    logo: "Imagenes/Instituciones/logo_fadu.png"
  },
  {
    universidad: "Universidad de San Martín",
    materia: "Ciencia de datos para la Gestión Urbana",
    logo: "Imagenes/Instituciones/logo_unsam.png"
  },
  {
    universidad: "Universidad Nacional de Avellaneda",
    materia: "Mercado de vivienda y gestión financiera",
    logo: "Imagenes/Instituciones/logo_undav.png"
  }
];

// Contenedor principal
const docenciaContainer = document.getElementById("docencia-lista");

// Crear dinámicamente los contenedores
docencia.forEach(u => {
  const uniDiv = document.createElement("div");
  uniDiv.classList.add("uni-container");

  // Imagen
  const logo = document.createElement("img");
  logo.src = u.logo;
  logo.alt = `Logo ${u.universidad}`;
  logo.classList.add("uni-logo");

  // Texto
  const textoDiv = document.createElement("div");
  textoDiv.classList.add("uni-texto");

  const h3 = document.createElement("h3");
  h3.textContent = u.universidad;

  const p = document.createElement("p");
  p.textContent = u.materia;

  textoDiv.appendChild(h3);
  textoDiv.appendChild(p);

  // Ensamblar estructura
  uniDiv.appendChild(logo);
  uniDiv.appendChild(textoDiv);

  // Insertar al contenedor principal
  docenciaContainer.appendChild(uniDiv);
});



// INSTITUCIONES CON LAS QUE TRABAJÉ
const instituciones = [
  { logo: "Imagenes/Instituciones/logo_ceeu.png" },
  { logo: "Imagenes/Instituciones/logo_cippec.png" },
  { logo: "Imagenes/Instituciones/logo_andata.png" },
  { logo: "Imagenes/Instituciones/logo_lis.png" },
  { logo: "Imagenes/Instituciones/logo_caf.png" },
  { logo: "Imagenes/Instituciones/logo_conicet.png" },
  { logo: "Imagenes/Instituciones/logo_fundar.png" }
];

// Contenedor principal
const workwithContainer = document.getElementById("workwith");

// Crear un contenedor interno para los logos
const logosContainer = document.createElement("div");
logosContainer.classList.add("logos-container");

// Crear los logos dinámicamente
instituciones.forEach(inst => {
  const logo = document.createElement("img");
  logo.src = inst.logo;
  logo.alt = "Logo institución";
  logo.classList.add("logo-item");
  logosContainer.appendChild(logo);
});

// Insertar en el HTML
workwithContainer.appendChild(logosContainer);




// CONTACTO

// CONTACTO
const datosContacto = {
  mail: {
    href: "mailto:sebastianrohr3@gmail.com",
    icon: "./Imagenes/redes_sociales_negras/gmail.png",
    alt: "Email"
  },
  linkedin: {
    href: "https://www.linkedin.com/in/sebastian-rohr-b4b878112/",
    icon: "./Imagenes/redes_sociales_negras/linkedin.png",
    alt: "LinkedIn"
  },
  instagram: {
    href: "https://www.instagram.com/sebarohr/",
    icon: "./Imagenes/redes_sociales_negras/instagram.png",
    alt: "Instagram"
  },
  csv: {
    href: "https://comosobrevivimos.substack.com/",
    icon: "./Imagenes/redes_sociales_negras/substack.png",
    alt: "Substack"
  }
};

// Contenedor principal
const containerContacto = document.getElementById("contactoCV");
containerContacto.innerHTML = ""; // Limpia antes de agregar

// Función para crear cada ícono con su link
function crearIconoContacto({ href, icon, alt }) {
  const a = document.createElement("a");
  a.href = href;
  a.target = "_blank";

  const img = document.createElement("img");
  img.src = icon;
  img.alt = alt;
  img.classList.add("icono-contacto"); // para el CSS

  a.appendChild(img);
  return a;
}

// Recorre los datos y agrega cada ícono
Object.values(datosContacto).forEach(contacto => {
  const icono = crearIconoContacto(contacto);
  containerContacto.appendChild(icono);
});



// ===============================
// SECCIÓN: CURRICULUM (CV)
// ===============================

// Datos del CV
const datosCV = [
  {
    idioma: "Español",
    link: "https://drive.google.com/file/d/14EvzlAIaS5fRHqO0xqfwTxxpZiz1aYMy/view?usp=sharing",
    img: "Imagenes/Iconos/cv español.png",
    alt: "CV Español"
  },
  {
    idioma: "Inglés",
    link: "https://drive.google.com/file/d/1GuAdZRkah8C4HQEb89GkQ2-wVn7UDRhD/view?usp=sharing",
    img: "Imagenes/Iconos/cv ingles.png",
    alt: "CV Inglés"
  }
];

// Contenedor donde se van a insertar los íconos
const containerCV = document.getElementById("CV");

// Limpiar contenido previo (por seguridad)
containerCV.innerHTML = "";

// Crear dinámicamente los íconos de CV
datosCV.forEach(cv => {
  const link = document.createElement("a");
  link.href = cv.link;
  link.target = "_blank";
  link.download = cv.alt; // nombre de descarga sugerido

  const img = document.createElement("img");
  img.src = cv.img;
  img.alt = cv.alt;
  img.classList.add("cv-icon"); // estilo CSS opcional

  link.appendChild(img);
  containerCV.appendChild(link);
});

