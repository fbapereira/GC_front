
export class BaseService {

    /**
         * Change body according param. It could not be a Pipe because of actual front Archtethure
         * @param body json to be transformed
         * @param values Values to be filled
         */
    transformBody(body: string, values: string[][]): string {
        if (!body) { throw Error('Dado [body] obrigatório não informado'); }
        if (!values) { throw Error('Dado [values] obrigatório não informado'); }
        let sBody = body;
        values.forEach((_values: string[]) => {
            if (_values.length !== 2) { throw Error('Dados de transformação não são par'); }
            sBody = sBody.replace(_values[0], _values[1]);
        });
        return sBody;
    }
}