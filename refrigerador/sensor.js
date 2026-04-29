const awsIot = require('aws-iot-device-sdk');

// --- CONFIGURACIÓN DE SEGURIDAD ---
const device = awsIot.device({
   // REEMPLAZA los nombres de los archivos por los tuyos exactos
   keyPath: './f9a61cd815bf5310bfa0268a72fcf9cf05d186654d6de314fb9569cae38e389a-private.pem.key', 
  certPath: './f9a61cd815bf5310bfa0268a72fcf9cf05d186654d6de314fb9569cae38e389a-certificate.pem.crt',
    caPath: './AmazonRootCA1.pem', 
  clientId: 'Sensor_Mayko',
      host: 'anj2x7szt7atz-ats.iot.us-east-1.amazonaws.com' // Tu endpoint que sacamos antes
});

// Variables de simulación
let temperaturaActual = 4.0; 
let sensorActivo = true;

device.on('connect', function() {
  console.log('✅ Myko: Sensor conectado exitosamente a AWS IoT Core');
  enviarDatos();
});

function enviarDatos() {
  if (!sensorActivo) return;

  // Simulamos que la temperatura sube y baja un poco
  // (Esto ayuda a que el Dashboard se vea dinámico)
  temperaturaActual += (Math.random() * 0.6) - 0.2; 
  
  const payload = {
    sensorId: "Refrigerador-Carniceria-01",
    temperatura: parseFloat(temperaturaActual.toFixed(2)),
    timestamp: new Date().toISOString(),
    ubicacion: "Pasillo Carnes - Sonora"
  };

  // Publicar al topic que escucha tu Lambda
  device.publish('refrigerador/SensorTemperatura/telemetria', JSON.stringify(payload));
  
  console.log(`📤 Mensaje enviado: ${payload.temperatura}°C | Hora: ${new Date().toLocaleTimeString()}`);

  // --- LÓGICA DE INTELIGENCIA DE BORDE ---
  let intervalo = 5000; // Por defecto: Envío cada 5 segundos (para que tu video no sea lento)
  
  // Si supera el umbral crítico de la rúbrica (4.5°C)
  if (temperaturaActual > 4.5) {
    console.log('⚠️ ALERTA: Modo Crítico detectado. Acelerando monitoreo...');
    intervalo = 2000; // Se acelera a cada 2 segundos para monitoreo detallado
  }

  setTimeout(enviarDatos, intervalo);
}

// Para detener el sensor con Ctrl+C limpiamente
process.on('SIGINT', () => {
  sensorActivo = false;
  console.log('\n🛑 Sensor Mykonnect apagado.');
  process.exit();
});