const productos = [
    {
        id: "IMP_0001",
        imagen: "Camara_endoscopica.png",
        // ESPAÑOL
        nombre_es: "Cámara Endoscópica LCD 4.3”",
        descripcion_es: "Cámara portátil con pantalla integrada. Ideal para inspecciones técnicas sin necesidad de smartphone. Sonda rígida de alta resistencia.",
        categoria_es: "Inspección",
        specs_es: "Pantalla 4.3\" | Bat. Recargable",
        // INGLÉS
        nombre_en: "Endoscopic Camera LCD 4.3”",
        descripcion_en: "Portable camera with integrated screen. Ideal for technical inspections without a smartphone. High-resistance rigid probe.",
        categoria_en: "Inspection",
        specs_en: "4.3\" Screen | Rechargeable Bat."
    },
    {
        id: "IMP_0002",
        imagen: "PIN_LED_Rueda.png",
        // ESPAÑOL
        nombre_es: "Luces LED RGB para Rayos",
        descripcion_es: "Iluminación decorativa y de seguridad para bicicletas con efecto visual dinámico. Instalación en rayos.",
        categoria_es: "Movilidad",
        specs_es: "Resistente al agua | Pilas/Batería",
        // INGLÉS
        nombre_en: "RGB LED Spoke Lights",
        descripcion_en: "Decorative and safety lighting for bicycles with dynamic visual effects. Spoke installation.",
        categoria_en: "Mobility",
        specs_en: "Water Resistant | Battery"
    },
    {
        id: "IMP_0003",
        imagen: "Linterna_LED.png",
        // ESPAÑOL
        nombre_es: "Linterna Headlamp COB",
        descripcion_es: "Iluminación manos libres de gran angular con sensor de movimiento. Ideal para trabajos de precisión en oscuridad.",
        categoria_es: "Outdoor",
        specs_es: "Sensor Movimiento | Gran Angular",
        // INGLÉS
        nombre_en: "COB Headlamp Flashlight",
        descripcion_en: "Hands-free wide-angle lighting with motion sensor. Ideal for precision work in the dark.",
        categoria_en: "Outdoor",
        specs_en: "Motion Sensor | Wide Angle"
    },
    {
        id: "IMP_0008",
        imagen: "Inflador_Portatil_120psi.png",
        // ESPAÑOL
        nombre_es: "Inflador Portátil 120 PSI",
        descripcion_es: "Compresor de aire compacto inteligente. Apto para bicicletas MTB, Ruta y E-bikes con corte automático.",
        categoria_es: "Ciclismo",
        specs_es: "120 PSI | Display Digital",
        // INGLÉS
        nombre_en: "Portable Inflator 120 PSI",
        descripcion_en: "Compact smart air compressor. Suitable for MTB, Road, and E-bikes with auto-stop.",
        categoria_en: "Cycling",
        specs_en: "120 PSI | Digital Display"
    },
    {
        id: "IMP_0009",
        imagen: "Sistema_vacio_neumatico.png",
        // ESPAÑOL
        nombre_es: "Sistema de Elevación por Vacío",
        descripcion_es: "Sistema neumático industrial para levantar, trasladar y posicionar cargas pesadas (vidrio, cajas) de forma segura.",
        categoria_es: "Industrial",
        specs_es: "Carga Pesada | Ergonómico",
        // INGLÉS
        nombre_en: "Vacuum Lifting System",
        descripcion_en: "Industrial pneumatic system to lift, move, and position heavy loads (glass, boxes) safely.",
        categoria_en: "Industrial",
        specs_en: "Heavy Load | Ergonomic"
    },
    {
        id: "IMP_0010",
        imagen: "Chaleco_led_reflectivo.png",
        // ESPAÑOL
        nombre_es: "Chaleco LED Reflectivo 360°",
        descripcion_es: "Visibilidad total nocturna. Tiras de fibra óptica LED con carga USB. Ideal running y ciclismo urbano.",
        categoria_es: "Seguridad",
        specs_es: "Carga USB | 3 Modos Luz",
        // INGLÉS
        nombre_en: "360° Reflective LED Vest",
        descripcion_en: "Total night visibility. LED fiber optic strips with USB charging. Ideal for running and urban cycling.",
        categoria_en: "Safety",
        specs_en: "USB Charge | 3 Light Modes"
    },
    {
        id: "IMP_0011",
        imagen: "Estacion_carga_7en1.png",
        // ESPAÑOL
        nombre_es: "Estación de Carga 7 en 1",
        descripcion_es: "Hub de carga rápida inalámbrica 30W. Compatible con todo el ecosistema móvil (Reloj, Auriculares, Celular).",
        categoria_es: "Tecnología",
        specs_es: "Carga Rápida | 30W",
        // INGLÉS
        nombre_en: "7-in-1 Charging Station",
        descripcion_en: "30W wireless fast charging hub. Compatible with the entire mobile ecosystem (Watch, Earbuds, Phone).",
        categoria_en: "Technology",
        specs_en: "Fast Charge | 30W"
    },
    {
        id: "IMP_EXTRA1",
        imagen: "Camara_endoscopica_vision_termica.png",
        // ESPAÑOL
        nombre_es: "Cámara Endoscópica Térmica",
        descripcion_es: "Diagnóstico profesional avanzado. Combina visión visual y térmica para detectar fugas de calor.",
        categoria_es: "Diagnóstico",
        specs_es: "Visión Térmica | Profesional",
        // INGLÉS
        nombre_en: "Thermal Endoscopic Camera",
        descripcion_en: "Advanced professional diagnosis. Combines visual and thermal vision to detect heat leaks.",
        categoria_en: "Diagnostic",
        specs_en: "Thermal Vision | Professional"
    },
    {
        id: "IMP_EXTRA2",
        imagen: "Tablet_endoscopica_vision_termica.png",
        // ESPAÑOL
        nombre_es: "Tablet Robusta Industrial",
        descripcion_es: "Tablet rugerizada con cámara térmica integrada. Resistente a caídas, agua y polvo.",
        categoria_es: "Industrial",
        specs_es: "Rugerizada | Android Ent.",
        // INGLÉS
        nombre_en: "Robust Industrial Tablet",
        descripcion_en: "Ruggedized tablet with integrated thermal camera. Drop, water, and dust resistant.",
        categoria_en: "Industrial",
        specs_en: "Ruggedized | Android Ent."
    },
    {
        id: "IMP_EXTRA3",
        imagen: "Inflador_Portatil_150psi.png",
        // ESPAÑOL
        nombre_es: "Inflador Táctico 150 PSI",
        descripcion_es: "Potencia superior para vehículos. Interfaz LED y función powerbank.",
        categoria_es: "Automotor",
        specs_es: "150 PSI | Powerbank",
        // INGLÉS
        nombre_en: "Tactical Inflator 150 PSI",
        descripcion_en: "Superior power for vehicles. LED interface and powerbank function.",
        categoria_en: "Automotive",
        specs_en: "150 PSI | Powerbank"
    }
];