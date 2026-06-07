const productos = [
    {
        id: "IMP_0001",
        imagen: "Camara_endoscopica.png",
        // ESPAÑOL
        nombre_es: "Cámara Endoscópica LCD 4.3”",
        descripcion_es: "Cámara portátil con pantalla integrada. Ideal para inspecciones técnicas sin necesidad de smartphone. Sonda rígida de alta resistencia.",
        categoria_es: "Inspección",
        specs_es: "Pantalla 4.3\" | Bat. Recargable",
        casos_uso_es: ["Mecánica automotriz", "Inspección de cañerías", "Mantenimiento industrial", "Detección de fallas en áreas de difícil acceso"],
        detalles_es: "Resolución HD 1080P, 6 luces LED ajustables, cable semirrígido de 5 metros, resistencia al agua IP67.",
        // INGLÉS
        nombre_en: "Endoscopic Camera LCD 4.3”",
        descripcion_en: "Portable camera with integrated screen. Ideal for technical inspections without a smartphone. High-resistance rigid probe.",
        categoria_en: "Inspection",
        specs_en: "4.3\" Screen | Rechargeable Bat.",
        casos_uso_en: ["Automotive mechanics", "Pipe inspection", "Industrial maintenance", "Fault detection in hard-to-reach areas"],
        detalles_en: "HD 1080P resolution, 6 adjustable LED lights, 5-meter semi-rigid cable, IP67 water resistance."
    },
    {
        id: "IMP_0002",
        imagen: "PIN_LED_Rueda.png",
        // ESPAÑOL
        nombre_es: "Luces LED RGB para Rayos",
        descripcion_es: "Iluminación decorativa y de seguridad para bicicletas con efecto visual dinámico. Instalación en rayos.",
        categoria_es: "Movilidad",
        specs_es: "Resistente al agua | Pilas/Batería",
        casos_uso_es: ["Ciclismo nocturno", "Seguridad vial", "Personalización de bicicletas", "Eventos deportivos"],
        detalles_es: "Diferentes modos de luz, fácil instalación sin herramientas, batería de larga duración, visibilidad 360°.",
        // INGLÉS
        nombre_en: "RGB LED Spoke Lights",
        descripcion_en: "Decorative and safety lighting for bicycles with dynamic visual effects. Spoke installation.",
        categoria_en: "Mobility",
        specs_en: "Water Resistant | Battery",
        casos_uso_en: ["Night cycling", "Road safety", "Bicycle customization", "Sports events"],
        detalles_en: "Different light modes, easy installation without tools, long-life battery, 360° visibility."
    },
    {
        id: "IMP_0003",
        imagen: "Linterna_LED.png",
        // ESPAÑOL
        nombre_es: "Linterna Headlamp COB",
        descripcion_es: "Iluminación manos libres de gran angular con sensor de movimiento. Ideal para trabajos de precisión en oscuridad.",
        categoria_es: "Outdoor",
        specs_es: "Sensor Movimiento | Gran Angular",
        casos_uso_es: ["Camping", "Senderismo nocturno", "Reparaciones mecánicas", "Pesca deportiva"],
        detalles_es: "Tecnología COB LED, 5 modos de iluminación, sensor de gestos para encendido/apagado, recargable vía USB-C.",
        // INGLÉS
        nombre_en: "COB Headlamp Flashlight",
        descripcion_en: "Hands-free wide-angle lighting with motion sensor. Ideal for precision work in the dark.",
        categoria_en: "Outdoor",
        specs_en: "Motion Sensor | Wide Angle",
        casos_uso_en: ["Camping", "Night hiking", "Mechanical repairs", "Sport fishing"],
        detalles_en: "COB LED technology, 5 lighting modes, gesture sensor for on/off, rechargeable via USB-C."
    },
    {
        id: "IMP_0008",
        imagen: "Inflador_Portatil_120psi.png",
        // ESPAÑOL
        nombre_es: "Inflador Portátil 120 PSI",
        descripcion_es: "Compresor de aire compacto inteligente. Apto para bicicletas MTB, Ruta y E-bikes con corte automático.",
        categoria_es: "Ciclismo",
        specs_es: "120 PSI | Display Digital",
        casos_uso_es: ["Inflado de neumáticos", "Bicicletas de alta gama", "Scooters eléctricos", "Balones deportivos"],
        detalles_es: "Display digital de alta precisión, batería de 2000mAh, linterna integrada, múltiples picos incluidos.",
        // INGLÉS
        nombre_en: "Portable Inflator 120 PSI",
        descripcion_en: "Compact smart air compressor. Suitable for MTB, Road, and E-bikes with auto-stop.",
        categoria_en: "Cycling",
        specs_en: "120 PSI | Digital Display",
        casos_uso_en: ["Tire inflation", "High-end bicycles", "Electric scooters", "Sports balls"],
        detalles_en: "High-precision digital display, 2000mAh battery, integrated flashlight, multiple nozzles included."
    },
    {
        id: "IMP_0009",
        imagen: "Sistema_vacio_neumatico.png",
        // ESPAÑOL
        nombre_es: "Sistema de Elevación por Vacío",
        descripcion_es: "Sistema neumático industrial para levantar, trasladar y posicionar cargas pesadas (vidrio, cajas) de forma segura.",
        categoria_es: "Industrial",
        specs_es: "Carga Pesada | Ergonómico",
        casos_uso_es: ["Logística", "Fábricas de vidrio", "Centros de distribución", "Líneas de ensamblaje"],
        detalles_es: "Capacidad hasta 150kg, sistema de seguridad anticaída, controles ergonómicos, bajo mantenimiento.",
        // INGLÉS
        nombre_en: "Vacuum Lifting System",
        descripcion_en: "Industrial pneumatic system to lift, move, and position heavy loads (glass, boxes) safely.",
        categoria_en: "Industrial",
        specs_en: "Heavy Load | Ergonomic",
        casos_uso_en: ["Logistics", "Glass factories", "Distribution centers", "Assembly lines"],
        detalles_en: "Capacity up to 150kg, anti-fall safety system, ergonomic controls, low maintenance."
    },
    {
        id: "IMP_0010",
        imagen: "Chaleco_led_reflectivo.png",
        // ESPAÑOL
        nombre_es: "Chaleco LED Reflectivo 360°",
        descripcion_es: "Visibilidad total nocturna. Tiras de fibra óptica LED con carga USB. Ideal running y ciclismo urbano.",
        categoria_es: "Seguridad",
        specs_es: "Carga USB | 3 Modos Luz",
        casos_uso_es: ["Running nocturno", "Ciclismo urbano", "Seguridad vial", "Trabajos nocturnos"],
        detalles_es: "Tiras LED ultra-brillantes, tejido transpirable, ajustable para todos los talles, hasta 10 horas de autonomía.",
        // INGLÉS
        nombre_en: "360° Reflective LED Vest",
        descripcion_en: "Total night visibility. LED fiber optic strips with USB charging. Ideal for running and urban cycling.",
        categoria_en: "Safety",
        specs_en: "USB Charge | 3 Light Modes",
        casos_uso_en: ["Night running", "Urban cycling", "Road safety", "Night work"],
        detalles_en: "Ultra-bright LED strips, breathable fabric, adjustable for all sizes, up to 10 hours of battery life."
    },
    {
        id: "IMP_0011",
        imagen: "Estacion_carga_7en1.png",
        // ESPAÑOL
        nombre_es: "Estación de Carga 7 en 1",
        descripcion_es: "Hub de carga rápida inalámbrica 30W. Compatible con todo el ecosistema móvil (Reloj, Auriculares, Celular).",
        categoria_es: "Tecnología",
        specs_es: "Carga Rápida | 30W",
        casos_uso_es: ["Escritorios de oficina", "Mesas de luz", "Estaciones de trabajo", "Uso familiar"],
        detalles_es: "Carga Qi de 30W, conectores USB-C, lightning y micro-USB, diseño compacto, protección contra sobrecarga.",
        // INGLÉS
        nombre_en: "7-in-1 Charging Station",
        descripcion_en: "30W wireless fast charging hub. Compatible with the entire mobile ecosystem (Watch, Earbuds, Phone).",
        categoria_en: "Technology",
        specs_en: "Fast Charge | 30W",
        casos_uso_en: ["Office desks", "Nightstands", "Workstations", "Family use"],
        detalles_en: "30W Qi charging, USB-C, lightning and micro-USB connectors, compact design, overcharge protection."
    },
    {
        id: "IMP_EXTRA1",
        imagen: "Camara_endoscopica_vision_termica.png",
        // ESPAÑOL
        nombre_es: "Cámara Endoscópica Térmica",
        descripcion_es: "Diagnóstico profesional avanzado. Combina visión visual y térmica para detectar fugas de calor.",
        categoria_es: "Diagnóstico",
        specs_es: "Visión Térmica | Profesional",
        casos_uso_es: ["Detección de fugas térmicas", "Inspección eléctrica", "HVAC", "Investigación técnica"],
        detalles_es: "Sensor térmico FLIR, doble cámara, pantalla táctil, grabación de video térmico.",
        // INGLÉS
        nombre_en: "Thermal Endoscopic Camera",
        descripcion_en: "Advanced professional diagnosis. Combines visual and thermal vision to detect heat leaks.",
        categoria_en: "Diagnostic",
        specs_en: "Thermal Vision | Professional",
        casos_uso_en: ["Thermal leak detection", "Electrical inspection", "HVAC", "Technical research"],
        detalles_en: "FLIR thermal sensor, dual camera, touch screen, thermal video recording."
    },
    {
        id: "IMP_EXTRA2",
        imagen: "Tablet_endoscopica_vision_termica.png",
        // ESPAÑOL
        nombre_es: "Tablet Robusta Industrial",
        descripcion_es: "Tablet rugerizada con cámara térmica integrada. Resistente a caídas, agua y polvo.",
        categoria_es: "Industrial",
        specs_es: "Rugerizada | Android Ent.",
        casos_uso_es: ["Trabajo de campo", "Minería", "Petróleo y Gas", "Construcción"],
        detalles_es: "Certificación IP68, pantalla Gorilla Glass, batería de alta capacidad (8000mAh), GPS de alta precisión.",
        // INGLÉS
        nombre_en: "Robust Industrial Tablet",
        descripcion_en: "Ruggedized tablet with integrated thermal camera. Drop, water, and dust resistant.",
        categoria_en: "Industrial",
        specs_en: "Ruggedized | Android Ent.",
        casos_uso_en: ["Field work", "Mining", "Oil and Gas", "Construction"],
        detalles_en: "IP68 certification, Gorilla Glass screen, high capacity battery (8000mAh), high precision GPS."
    },
    {
        id: "IMP_EXTRA3",
        imagen: "Inflador_Portatil_150psi.png",
        // ESPAÑOL
        nombre_es: "Inflador Táctico 150 PSI",
        descripcion_es: "Potencia superior para vehículos. Interfaz LED y función powerbank.",
        categoria_es: "Automotor",
        specs_es: "150 PSI | Powerbank",
        casos_uso_es: ["Autos y camionetas", "Motos", "Situaciones de emergencia", "Viajes largos"],
        detalles_es: "Presión máxima 150 PSI, función de carga inversa USB, luz SOS integrada, carcasa metálica disipadora de calor.",
        // INGLÉS
        nombre_en: "Tactical Inflator 150 PSI",
        descripcion_en: "Superior power for vehicles. LED interface and powerbank function.",
        categoria_en: "Automotive",
        specs_en: "150 PSI | Powerbank",
        casos_uso_en: ["Cars and SUVs", "Motorcycles", "Emergency situations", "Long trips"],
        detalles_en: "150 PSI maximum pressure, reverse USB charging function, integrated SOS light, heat-dissipating metal casing."
    }
];