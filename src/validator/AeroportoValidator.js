import * as Yup from 'yup';

const AeroportoValidator = Yup
    .object()
    .shape({
        nome: Yup
            .string()
            .min(3, 'O mínimo de caracteres é 3!')
            .max(65, '')
            .required('Campo obrigatório!'),

        sigla: Yup
            .string()
            .min(3, 'O mínimo de caracteres é 3!')
            .max(4, 'O máximo de caracteres é 4!')
            .required('Campo obrigatório!'),

        pais: Yup
            .string()
            .required(''),

        uf: Yup
            .string()
            .required('Escolha o estado de destino.'),

        cidade: Yup
            .string()
            .required('Escolha a cidade de destino.')
    });

export default AeroportoValidator