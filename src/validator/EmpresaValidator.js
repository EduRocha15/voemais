import * as Yup from 'yup';

const EmpresaValidator = Yup
    .object()
    .shape({
        nome: Yup
            .string()
            .min(3, 'O mínimo de caracteres é 3!')
            .max(10, 'O máximo de caracteres é 10!')
            .required('Campo obrigatório!'),

        logo: Yup
            .string()
            .min(3, 'O mínimo de caracteres é 3'),

        site: Yup
            .string()
            .url('URL inválida.')
    });

export default EmpresaValidator
