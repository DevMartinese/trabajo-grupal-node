# Trabajo grupal
Ya casi termina el curso 😱. Por eso, acá te tiramos algo bien complicado para que reniegues.

## Tarea
- Pensar qué servicios y cómo interactuan entre si son necesarios para el ejemplo de pedido de DNI que vimos
- Forkear este repo
- Implementarlo utilizando ebased
- Una vez completado, generar una PR contra este repositorio

## A tener en cuenta
- Debe ser en forma grupal: el link de la clase va a estar disponible todo el día para que puedan hablar entre ustedes y coordinar
- Pueden utilizar el plugin LiveShare para que todos puedan codear en simultáneo
- Debe estar a final del día 😱😱😱. Por lo tanto, como consejo, deberían empezar por lo más básico y luego ir agregando funcionalidades.

## Requerimientos
- Trabajar entre todos
- No es obligatorio, pero si hay un diagrama de cómo funciona por detrás el proyecto y qué servicios de AWS utiliza (se puede usar draw.io)

INPUT:
	- Nombre
	- Apellido
	- Dirección
	- Localidad
	- Provincia
	- Sexo
	- Nacionalidad
	- Fecha de nacimiento
	- Donante (boolean)
	- Firma (href)
	- Foto (href)
OUTPUT:
	- Fecha de emisión
	- Fecha de vencimiento
	- N° de trámite
	- N° DNI
-------------------------------------------
AGG 1 => Marcos x2, Ayrton, Martin B
	API GATEWAY 
	LAMBDA 1 (validacion de input) 
	SQS 
AGG 2 => Mariano, Gonza, Martin C, Ema
	LAMBDA 2 (genera el output) 
	SNS (mail que avisa que el tramite se inició)
AGG 3
	(endpoint de consulta)
-------------------------------------------
GITHUB











