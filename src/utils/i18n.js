const tokenTypes = [];

tokenTypes["Identifier"] = "Identificador";
tokenTypes["Integer"] = "Inteiro";
tokenTypes["KeyWord"] = "Palavra-reservada";
tokenTypes["SugarToken"] = "Especiais";

export const translateTokenType = (tokenType) => {
    return tokenTypes[tokenType] || tokenType;
}
