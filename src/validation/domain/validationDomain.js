const sendToSqs = require("../service/validationService");
const validator = require('validator').default;
const { InputValidation } = require("ebased/schema/inputValidation");

module.exports = async (commandPayload, commandMeta) => {
  const {
    names,
    lastName,
    email,
    address,
    locality,
    province,
    sex,
    nationality,
    birthDate,
    donor,
    signature,
    photo,
  } = commandPayload;
  const locale = 'es-ES';


  new inputPersonDNISchema (
    commandPayload,
    commandMeta
  ).get();


  if ( !validator.isAlpha(names, locale)) return { status:400 ,body:"El formato de nombre es incorrecto."};
  if ( !validator.isAlpha(lastName, locale)) return { status:400 ,body:"El formato de apellido es incorrecto "};
  if ( !validator.isEmail(email)) return { status:400 ,body:"El formato de mail es incorrecto "};
  if ( !validator.isAlpha(locality, locale)) return { status:400 ,body:"El formato de la localidad es incorrecto "};
  if ( !validator.isAlpha(province, locale)) return { status:400 ,body:"El formato de la provincia es incorrecto "};
  if (sex.toUpperCase() !== 'M' && sex.toUpperCase() !== 'F') return { status:400 ,body:"El sexo solo puede ser M o F"};
  if ( !validator.isAlpha(nationality, locale)) return { status:400 ,body:"El formato de nacionaldiad es incorrecto "};
  if ( !validator.isDate(birthDate,"DD/MM/YYYY")) return { status:400 ,body:"El formato de fecha de nacimiento es incorrecto "};
  if ( !validator.isAlpha(donor, locale)) return { status:400 ,body:"El formato de la donor es incorrecto "};
  if ( !validator.isURL(signature)) return { status:400 ,body:"El formato de la firma es incorrecto "};
  if ( !validator.isURL(photo)) return { status:400 ,body:"El formato de la foto es incorrecto "};

  await sendToSqs(commandPayload);
  return { body: "Tus datos son correctos para iniciar el tramite !"};

};

class inputPersonDNISchema extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.status,
      payload: payload,
      source: "VALIDATION.DOMAIN",
      specversion: "v1.0.0",
      schema: {
        strict: true,
        names: { type: String, min: 2, max: 50, required: true },
        lastName: { type: String, min: 2, max: 50, required: true },
        email: { type: String, min: 2, max: 200, required: true },
        address: { type: String, min: 2, max: 50, required: true },
        locality: { type: String, min: 2, max: 50, required: true },
        province: { type: String, min: 2, max: 20, required: true },
        sex: { type: String, min: 1, max: 1, required: true },
        nationality: { type: String, min: 1, max: 20, required: true },
        birthDate: { type: String, min: 10, max: 10, required: true },
        donor: { type: Boolean, default: true , required: true },
        signature: { type: String, min: 2, max: 500, required: true },
        photo: { type: String, min: 2, max: 500, required: true },
      },
    });
  }
}
