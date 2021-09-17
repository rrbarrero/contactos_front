import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
    persona: yup.object().shape({
        tratamiento: yup.object().shape({
            id: yup.number().required('Tratamiento requerido')
        }),
        nombre: yup
            .string()
            .min(4, 'Se necesitan un mínimo de 4 caracteres para el campo nombre')
            .required('El campo nombre es requerido'),
        apellidos: yup
            .string()
            .min(8, 'Se necesitan un mínimo de 8 caracteres para el campo apellidos')
            .required('El campo apellidos es requerido'),
    }),
    ciudad: yup.string().min(4, "Mínimo 4 caracteres para el campo ciudad").required("El campo ciudad es requerido"),
});

export default ValidationSchema;