/**
 * Gera um número randômico de 4 dígitos
 * @returns {number} Número randômico entre 1000 e 9999
 */
export const getRandomNumber = () => {
    return new Date().getTime();
}

/**
 * Gera um email randômico com um domínio específico
 * @param {string} prefix - Prefixo do email (opcional)
 * @param {string} domain - Domínio do email (opcional, default: test.com)
 * @returns {string} Email randômico
 */
export const getRandomEmail = (prefix = 'qa', domain = 'test.com') => {
    return `${prefix}-${getRandomNumber()}@${domain}`;
}
