# Mykonnect - Sistema de Monitoreo Inteligente de Cadena de Frío

Este proyecto implementa una solución integral de IoT para el monitoreo de temperaturas en cámaras frías (carnicerías y abarrotes) en Sonora, México. La arquitectura está diseñada en AWS como alternativa escalable y profesional a Google Cloud Platform.

## 🚀 Entregables del Proyecto

### 1. Guarda de Temperaturas (Persistencia) - 33%
Se utiliza **Amazon DynamoDB** como base de datos NoSQL para el almacenamiento de telemetría en tiempo real. 
- **Equivalencia:** Sustituye a Google Firestore.
- **Estructura:** Tabla `TelemetriaRefrigerador` con `sensorId` (Partition Key) y `timestamp` (Sort Key).

### 2. Verificación de Datos (Procesamiento) - 33%
Implementado mediante **AWS Lambda** y **Amazon SNS**.
- **Equivalencia:** Sustituye a Google Cloud Functions.
- **Lógica de Negocio:** La función valida si la temperatura excede los 4.5°C. Incluye "Inteligencia de Borde" donde el sensor aumenta su frecuencia de envío ante alertas críticas.
- **Escalamiento:** Envío de notificaciones automáticas vía correo electrónico.

### 3. Dashboard Real-Time (Visualización) - 33%
Interfaz web desarrollada en HTML5/JavaScript que consume una **Lambda Function URL**.
- **Equivalencia:** Sustituye a Google Cloud Run.
- **Funcionalidad:** Actualización asíncrona (AJAX/Fetch) cada 3 segundos sin recarga de página.
- **Estrategias de Valor:**
    - **Peak Shaving:** Optimización de consumo energético basado en las tarifas de CFE Sonora (2:00 PM - 6:00 PM).
    - **Mantenimiento Predictivo:** Detección de ineficiencias en el motor basadas en patrones de enfriamiento.
    - **Multi-tenancy:** Diferenciación de lógica para Carnicerías (Seguridad) vs. Abarrotes (Ahorro).

## 🛠️ Instrucciones de Instalación y Uso

1. **Clonar el repositorio:** `git clone <url-del-repo>`
2. **Instalar dependencias:** Ejecutar `npm install aws-iot-device-sdk` en la carpeta raíz.
3. **Configurar Certificados:** Colocar los archivos `.pem` y `.key` de AWS IoT en la carpeta raíz y actualizar los nombres en `sensor.js`.
4. **Ejecutar el Sensor:** `node sensor.js`
5. **Ver Dashboard:** Abrir `index.html` en cualquier navegador moderno.

---
**Desarrollado por:** Mayko - 8vo Semestre
