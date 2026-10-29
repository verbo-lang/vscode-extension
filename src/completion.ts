import * as vscode from 'vscode';

export class VerboCompletionProvider implements vscode.CompletionItemProvider {
  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    const items: vscode.CompletionItem[] = [];

    // Artigos (Mutabilidade)
    items.push(
      this.criarItem('O', vscode.CompletionItemKind.Keyword, 'Artigo definido masculino (constante imutável)', 'O ${1:nome} é ${2:valor}.'),
      this.criarItem('A', vscode.CompletionItemKind.Keyword, 'Artigo definido feminino (constante imutável)', 'A ${1:nome} é ${2:valor}.'),
      this.criarItem('Um', vscode.CompletionItemKind.Keyword, 'Artigo indefinido masculino (variável mutável)', 'Um ${1:nome} está ${2:valor}.'),
      this.criarItem('Uma', vscode.CompletionItemKind.Keyword, 'Artigo indefinido feminino (variável mutável)', 'Uma ${1:nome} está ${2:valor}.')
    );

    // Palavras-chave de controle
    items.push(
      this.criarItem('Para', vscode.CompletionItemKind.Keyword, 'Declaração de função', 'Para ${1:Nome} usando (${2:param}: ${3:Texto}):\n\t$0\n.'),
      this.criarItem('usando', vscode.CompletionItemKind.Keyword, 'Parâmetros de função', 'usando (${1:param}: ${2:Texto})'),
      this.criarItem('com', vscode.CompletionItemKind.Keyword, 'Passagem de argumentos', 'com (${1:args})'),
      this.criarItem('Retorne', vscode.CompletionItemKind.Keyword, 'Retorno de função', 'Retorne ${1:valor}.'),
      this.criarItem('Exibir', vscode.CompletionItemKind.Keyword, 'Saída padrão', 'Exibir com (${1:expressao}).'),
      this.criarItem('Se', vscode.CompletionItemKind.Keyword, 'Estrutura condicional', 'Se ${1:condicao} for ${2|igual,menor que,maior que|} ${3:valor}, então:\n\t$0\n.'),
      this.criarItem('Senão', vscode.CompletionItemKind.Keyword, 'Alternativa condicional', 'Senão:\n\t$0\n.'),
      this.criarItem('Repita', vscode.CompletionItemKind.Keyword, 'Repetição N vezes', 'Repita ${1:10} vezes:\n\t$0\n.'),
      this.criarItem('Repita para cada', vscode.CompletionItemKind.Keyword, 'Repetição sobre lista', 'Repita para cada ${1:item} em ${2:lista}:\n\t$0\n.'),
      this.criarItem('Enquanto', vscode.CompletionItemKind.Keyword, 'Loop condicional', 'Enquanto ${1:condicao}:\n\t$0\n.'),
      this.criarItem('Dado', vscode.CompletionItemKind.Keyword, 'Cláusula de guarda / premissa', 'Dado ${1:condicao}.'),
      this.criarItem('Incluir', vscode.CompletionItemKind.Keyword, 'Importar pacote padrão', 'Incluir ${1|Texto,Matematica,Arquivo,Html,Internet,Json,Csv,Sistema,Criptografia|}.')
    );

    // V2 Concorrência e Estruturas
    items.push(
      this.criarItem('Entidade', vscode.CompletionItemKind.Class, 'Declaração de estrutura de dados', 'A entidade ${1:Nome} contendo (${2:campo}: ${3:Texto}).'),
      this.criarItem('novo', vscode.CompletionItemKind.Keyword, 'Instanciação de entidade', 'um novo ${1:Entidade} contendo (${2:valores})'),
      this.criarItem('Simultaneamente', vscode.CompletionItemKind.Keyword, 'Execução paralela', 'Simultaneamente:\n\t$0\n.'),
      this.criarItem('Aguarde', vscode.CompletionItemKind.Keyword, 'Sincronização', 'Aguarde.'),
      this.criarItem('Canal', vscode.CompletionItemKind.TypeParameter, 'Canal concorrente', 'Canal de ${1|Texto,Inteiro,Decimal|}'),
      this.criarItem('Enviar', vscode.CompletionItemKind.Keyword, 'Enviar dado para canal', 'Enviar ${1:dado} para ${2:canal}.'),
      this.criarItem('Receber', vscode.CompletionItemKind.Keyword, 'Receber dado de canal', 'Receber de ${1:canal}'),
      this.criarItem('Tente', vscode.CompletionItemKind.Keyword, 'Tratamento de exceções', 'Tente:\n\t$1\nCapture ${2:erro}:\n\t$0\n.'),
      this.criarItem('Sinalize', vscode.CompletionItemKind.Keyword, 'Lançar pânico / erro crítico', 'Sinalize "${1:mensagem}".')
    );

    // V3 Servidor Web
    items.push(
      this.criarItem('Servidor', vscode.CompletionItemKind.Class, 'Configuração do Servidor Web', 'Um ${1:app} está Servidor com (local, ${2:5000}).'),
      this.criarItem('rota', vscode.CompletionItemKind.Function, 'Rota HTTP', '${1:app} rota ${2|GET,POST,PUT,DELETE|} em "${3:/}":\n\t$0\n.'),
      this.criarItem('iniciar', vscode.CompletionItemKind.Method, 'Iniciar servidor web', '${1:app} iniciar.'),
      this.criarItem('rodar', vscode.CompletionItemKind.Method, 'Rodar servidor web', '${1:app} rodar.')
    );

    // Tipos primitivos
    const tipos = ['Texto', 'Inteiro', 'Decimal', 'Lógico', 'Lista'];
    for (const t of tipos) {
      const item = new vscode.CompletionItem(t, vscode.CompletionItemKind.TypeParameter);
      item.detail = `Tipo primitivo ${t}`;
      items.push(item);
    }

    // Literais
    items.push(
      this.criarItem('Verdadeiro', vscode.CompletionItemKind.Value, 'Valor booleano verdadeiro'),
      this.criarItem('Falso', vscode.CompletionItemKind.Value, 'Valor booleano falso'),
      this.criarItem('Nulo', vscode.CompletionItemKind.Value, 'Valor nulo / ausência de valor')
    );

    // Biblioteca Padrão
    this.adicionarStdlib(items);

    return items;
  }

  private adicionarStdlib(items: vscode.CompletionItem[]) {
    // Módulo Texto
    items.push(
      this.criarItem('Tamanho de Texto', vscode.CompletionItemKind.Function, 'Tamanho(s: Texto) -> Inteiro', 'Tamanho de Texto com (${1:string})'),
      this.criarItem('Maiusculas de Texto', vscode.CompletionItemKind.Function, 'Maiusculas(s: Texto) -> Texto', 'Maiusculas de Texto com (${1:string})'),
      this.criarItem('Minusculas de Texto', vscode.CompletionItemKind.Function, 'Minusculas(s: Texto) -> Texto', 'Minusculas de Texto com (${1:string})'),
      this.criarItem('Contem de Texto', vscode.CompletionItemKind.Function, 'Contem(s, substr: Texto) -> Lógico', 'Contem de Texto com (${1:string}, ${2:busca})'),
      this.criarItem('Substituir de Texto', vscode.CompletionItemKind.Function, 'Substituir(s, velho, novo: Texto) -> Texto', 'Substituir de Texto com (${1:string}, ${2:antigo}, ${3:novo})'),
      this.criarItem('Dividir de Texto', vscode.CompletionItemKind.Function, 'Dividir(s, sep: Texto) -> Lista', 'Dividir de Texto com (${1:string}, ${2:separador})')
    );

    // Módulo Matematica
    items.push(
      this.criarItem('Absoluto de Matematica', vscode.CompletionItemKind.Function, 'Absoluto(x: Decimal) -> Decimal', 'Absoluto de Matematica com (${1:numero})'),
      this.criarItem('Teto de Matematica', vscode.CompletionItemKind.Function, 'Teto(x: Decimal) -> Decimal', 'Teto de Matematica com (${1:numero})'),
      this.criarItem('Piso de Matematica', vscode.CompletionItemKind.Function, 'Piso(x: Decimal) -> Decimal', 'Piso de Matematica com (${1:numero})'),
      this.criarItem('Maximo de Matematica', vscode.CompletionItemKind.Function, 'Maximo(a, b: Decimal) -> Decimal', 'Maximo de Matematica com (${1:a}, ${2:b})'),
      this.criarItem('Minimo de Matematica', vscode.CompletionItemKind.Function, 'Minimo(a, b: Decimal) -> Decimal', 'Minimo de Matematica com (${1:a}, ${2:b})'),
      this.criarItem('Potencia de Matematica', vscode.CompletionItemKind.Function, 'Potencia(base, exp: Decimal) -> Decimal', 'Potencia de Matematica com (${1:base}, ${2:expoente})'),
      this.criarItem('Raiz de Matematica', vscode.CompletionItemKind.Function, 'Raiz(x: Decimal) -> Decimal', 'Raiz de Matematica com (${1:numero})')
    );

    // Módulo Arquivo
    items.push(
      this.criarItem('LerTexto de Arquivo', vscode.CompletionItemKind.Function, 'LerTexto(caminho: Texto) -> Texto', 'LerTexto de Arquivo com (${1:caminho})'),
      this.criarItem('EscreverTexto de Arquivo', vscode.CompletionItemKind.Function, 'EscreverTexto(caminho, conteudo: Texto)', 'EscreverTexto de Arquivo com (${1:caminho}, ${2:conteudo})')
    );

    // Módulo Html
    items.push(
      this.criarItem('CriarPagina de Html', vscode.CompletionItemKind.Function, 'CriarPagina(titulo, corpo: Texto) -> Texto', 'CriarPagina de Html com (${1:titulo}, ${2:corpo})'),
      this.criarItem('CriarPaginaComEstilo de Html', vscode.CompletionItemKind.Function, 'CriarPaginaComEstilo(titulo, estilo, corpo: Texto) -> Texto', 'CriarPaginaComEstilo de Html com (${1:titulo}, ${2:estilo}, ${3:corpo})'),
      this.criarItem('CriarElemento de Html', vscode.CompletionItemKind.Function, 'CriarElemento(tag, conteudo: Texto) -> Texto', 'CriarElemento de Html com (${1:tag}, ${2:conteudo})'),
      this.criarItem('CriarElementoComAtributos de Html', vscode.CompletionItemKind.Function, 'CriarElementoComAtributos(tag, attrs, conteudo: Texto) -> Texto', 'CriarElementoComAtributos de Html com (${1:tag}, ${2:atributos}, ${3:conteudo})'),
      this.criarItem('CriarLista de Html', vscode.CompletionItemKind.Function, 'CriarLista(itens...) -> Texto', 'CriarLista de Html com (${1:itens})'),
      this.criarItem('CriarTabela de Html', vscode.CompletionItemKind.Function, 'CriarTabela(headers, linhas) -> Texto', 'CriarTabela de Html com (${1:headers}, ${2:linhas})'),
      this.criarItem('CriarLink de Html', vscode.CompletionItemKind.Function, 'CriarLink(url, texto: Texto) -> Texto', 'CriarLink de Html com (${1:url}, ${2:texto})'),
      this.criarItem('CriarImagem de Html', vscode.CompletionItemKind.Function, 'CriarImagem(src, alt: Texto) -> Texto', 'CriarImagem de Html com (${1:src}, ${2:alt})'),
      this.criarItem('Atributo de Html', vscode.CompletionItemKind.Function, 'Atributo(chave, valor: Texto) -> Texto', 'Atributo de Html com (${1:chave}, ${2:valor})')
    );

    // Módulo Internet
    items.push(
      this.criarItem('Obter de Internet', vscode.CompletionItemKind.Function, 'Obter(url: Texto) -> Texto', 'Obter de Internet com (${1:url})'),
      this.criarItem('Postar de Internet', vscode.CompletionItemKind.Function, 'Postar(url, corpo, tipoConteudo: Texto) -> Texto', 'Postar de Internet com (${1:url}, ${2:corpo}, ${3:"application/json"})'),
      this.criarItem('Put de Internet', vscode.CompletionItemKind.Function, 'Put(url, corpo, tipoConteudo: Texto) -> Texto', 'Put de Internet com (${1:url}, ${2:corpo}, ${3:"application/json"})'),
      this.criarItem('Deletar de Internet', vscode.CompletionItemKind.Function, 'Deletar(url: Texto) -> Texto', 'Deletar de Internet com (${1:url})'),
      this.criarItem('Requisicao de Internet', vscode.CompletionItemKind.Function, 'Requisicao(metodo, url, corpo, tipoConteudo: Texto) -> Texto', 'Requisicao de Internet com (${1:metodo}, ${2:url}, ${3:corpo}, ${4:tipoConteudo})'),
      this.criarItem('Status de Internet', vscode.CompletionItemKind.Function, 'Status(metodo, url: Texto) -> Inteiro', 'Status de Internet com (${1:metodo}, ${2:url})'),
      this.criarItem('Baixar de Internet', vscode.CompletionItemKind.Function, 'Baixar(url, caminhoDestino: Texto) -> Texto', 'Baixar de Internet com (${1:url}, ${2:caminhoDestino})'),
      this.criarItem('ConectarTCP de Internet', vscode.CompletionItemKind.Function, 'ConectarTCP(endereco: Texto) -> Conexao', 'ConectarTCP de Internet com (${1:endereco})'),
      this.criarItem('OuvirTCP de Internet', vscode.CompletionItemKind.Function, 'OuvirTCP(endereco: Texto) -> ServidorTCP', 'OuvirTCP de Internet com (${1:endereco})'),
      this.criarItem('OuvirUDP de Internet', vscode.CompletionItemKind.Function, 'OuvirUDP(endereco: Texto) -> ConexaoUDP', 'OuvirUDP de Internet com (${1:endereco})'),
      this.criarItem('EnviarUDP de Internet', vscode.CompletionItemKind.Function, 'EnviarUDP(endereco, mensagem: Texto) -> Inteiro', 'EnviarUDP de Internet com (${1:endereco}, ${2:mensagem})'),
      this.criarItem('ResolverHost de Internet', vscode.CompletionItemKind.Function, 'ResolverHost(host: Texto) -> Lista', 'ResolverHost de Internet com (${1:host})'),
      this.criarItem('PortaAberta de Internet', vscode.CompletionItemKind.Function, 'PortaAberta(host: Texto, porta: Inteiro) -> Lógico', 'PortaAberta de Internet com (${1:host}, ${2:porta})'),
      this.criarItem('ObterIPLocal de Internet', vscode.CompletionItemKind.Function, 'ObterIPLocal() -> Texto', 'ObterIPLocal de Internet com ()'),
      this.criarItem('DefinirTempoLimite de Internet', vscode.CompletionItemKind.Function, 'DefinirTempoLimite(segundos: Inteiro)', 'DefinirTempoLimite de Internet com (${1:segundos})')
    );

    // Módulo Json
    items.push(
      this.criarItem('Codificar de Json', vscode.CompletionItemKind.Function, 'Codificar(valor: Qualquer) -> Texto', 'Codificar de Json com (${1:valor})'),
      this.criarItem('Decodificar de Json', vscode.CompletionItemKind.Function, 'Decodificar(texto: Texto) -> Qualquer', 'Decodificar de Json com (${1:texto})'),
      this.criarItem('ObterCampo de Json', vscode.CompletionItemKind.Function, 'ObterCampo(obj, campo: Texto) -> Qualquer', 'ObterCampo de Json com (${1:obj}, ${2:campo})'),
      this.criarItem('ListaChaves de Json', vscode.CompletionItemKind.Function, 'ListaChaves(obj) -> Lista', 'ListaChaves de Json com (${1:obj})'),
      this.criarItem('Tamanho de Json', vscode.CompletionItemKind.Function, 'Tamanho(obj) -> Inteiro', 'Tamanho de Json com (${1:obj})')
    );

    // Módulo Csv
    items.push(
      this.criarItem('Ler de Csv', vscode.CompletionItemKind.Function, 'Ler(texto: Texto) -> Lista', 'Ler de Csv com (${1:texto})'),
      this.criarItem('LerArquivo de Csv', vscode.CompletionItemKind.Function, 'LerArquivo(caminho: Texto) -> Lista', 'LerArquivo de Csv com (${1:caminho})'),
      this.criarItem('Escrever de Csv', vscode.CompletionItemKind.Function, 'Escrever(linhas: Lista) -> Texto', 'Escrever de Csv com (${1:linhas})'),
      this.criarItem('EscreverArquivo de Csv', vscode.CompletionItemKind.Function, 'EscreverArquivo(caminho: Texto, linhas: Lista)', 'EscreverArquivo de Csv com (${1:caminho}, ${2:linhas})'),
      this.criarItem('Formatar de Csv', vscode.CompletionItemKind.Function, 'Formatar(linhas: Lista) -> Texto', 'Formatar de Csv com (${1:linhas})')
    );

    // Módulo Sistema
    items.push(
      this.criarItem('Argumentos de Sistema', vscode.CompletionItemKind.Function, 'Argumentos() -> Lista', 'Argumentos de Sistema com ()'),
      this.criarItem('Argumento de Sistema', vscode.CompletionItemKind.Function, 'Argumento(indice: Inteiro) -> Texto', 'Argumento de Sistema com (${1:indice})'),
      this.criarItem('NumeroDeArgumentos de Sistema', vscode.CompletionItemKind.Function, 'NumeroDeArgumentos() -> Inteiro', 'NumeroDeArgumentos de Sistema com ()'),
      this.criarItem('VariavelDeAmbiente de Sistema', vscode.CompletionItemKind.Function, 'VariavelDeAmbiente(nome: Texto) -> Texto', 'VariavelDeAmbiente de Sistema com (${1:nome})'),
      this.criarItem('DefinirVariavelDeAmbiente de Sistema', vscode.CompletionItemKind.Function, 'DefinirVariavelDeAmbiente(nome, valor: Texto)', 'DefinirVariavelDeAmbiente de Sistema com (${1:nome}, ${2:valor})'),
      this.criarItem('RemoverVariavelDeAmbiente de Sistema', vscode.CompletionItemKind.Function, 'RemoverVariavelDeAmbiente(nome: Texto)', 'RemoverVariavelDeAmbiente de Sistema com (${1:nome})'),
      this.criarItem('VariaveisDeAmbiente de Sistema', vscode.CompletionItemKind.Function, 'VariaveisDeAmbiente() -> Lista', 'VariaveisDeAmbiente de Sistema com ()'),
      this.criarItem('ExecutarComando de Sistema', vscode.CompletionItemKind.Function, 'ExecutarComando(comando: Texto) -> Texto', 'ExecutarComando de Sistema com (${1:comando})'),
      this.criarItem('ExecutarComandoComArgumentos de Sistema', vscode.CompletionItemKind.Function, 'ExecutarComandoComArgumentos(programa: Texto, args: Lista) -> Texto', 'ExecutarComandoComArgumentos de Sistema com (${1:programa}, ${2:args})'),
      this.criarItem('ExecutarComandoComEntrada de Sistema', vscode.CompletionItemKind.Function, 'ExecutarComandoComEntrada(comando, entrada: Texto) -> Texto', 'ExecutarComandoComEntrada de Sistema com (${1:comando}, ${2:entrada})'),
      this.criarItem('DiretorioAtual de Sistema', vscode.CompletionItemKind.Function, 'DiretorioAtual() -> Texto', 'DiretorioAtual de Sistema com ()'),
      this.criarItem('MudarDiretorio de Sistema', vscode.CompletionItemKind.Function, 'MudarDiretorio(caminho: Texto)', 'MudarDiretorio de Sistema com (${1:caminho})'),
      this.criarItem('NomeSistemaOperacional de Sistema', vscode.CompletionItemKind.Function, 'NomeSistemaOperacional() -> Texto', 'NomeSistemaOperacional de Sistema com ()'),
      this.criarItem('ArquiteturaProcessador de Sistema', vscode.CompletionItemKind.Function, 'ArquiteturaProcessador() -> Texto', 'ArquiteturaProcessador de Sistema com ()'),
      this.criarItem('NomeDoComputador de Sistema', vscode.CompletionItemKind.Function, 'NomeDoComputador() -> Texto', 'NomeDoComputador de Sistema com ()'),
      this.criarItem('PID de Sistema', vscode.CompletionItemKind.Function, 'PID() -> Inteiro', 'PID de Sistema com ()'),
      this.criarItem('NumeroDeCPUs de Sistema', vscode.CompletionItemKind.Function, 'NumeroDeCPUs() -> Inteiro', 'NumeroDeCPUs de Sistema com ()'),
      this.criarItem('Sair de Sistema', vscode.CompletionItemKind.Function, 'Sair()', 'Sair de Sistema com ()'),
      this.criarItem('SairCom de Sistema', vscode.CompletionItemKind.Function, 'SairCom(codigo: Inteiro)', 'SairCom de Sistema com (${1:codigo})')
    );

    // Módulo Criptografia
    items.push(
      this.criarItem('Sha256 de Criptografia', vscode.CompletionItemKind.Function, 'Sha256(texto: Texto) -> Texto', 'Sha256 de Criptografia com (${1:texto})'),
      this.criarItem('Sha512 de Criptografia', vscode.CompletionItemKind.Function, 'Sha512(texto: Texto) -> Texto', 'Sha512 de Criptografia com (${1:texto})'),
      this.criarItem('Sha1 de Criptografia', vscode.CompletionItemKind.Function, 'Sha1(texto: Texto) -> Texto', 'Sha1 de Criptografia com (${1:texto})'),
      this.criarItem('Md5 de Criptografia', vscode.CompletionItemKind.Function, 'Md5(texto: Texto) -> Texto', 'Md5 de Criptografia com (${1:texto})'),
      this.criarItem('HmacSha256 de Criptografia', vscode.CompletionItemKind.Function, 'HmacSha256(chave, texto: Texto) -> Texto', 'HmacSha256 de Criptografia com (${1:chave}, ${2:texto})'),
      this.criarItem('CompararHash de Criptografia', vscode.CompletionItemKind.Function, 'CompararHash(a, b: Texto) -> Lógico', 'CompararHash de Criptografia com (${1:a}, ${2:b})'),
      this.criarItem('Base64Codificar de Criptografia', vscode.CompletionItemKind.Function, 'Base64Codificar(texto: Texto) -> Texto', 'Base64Codificar de Criptografia com (${1:texto})'),
      this.criarItem('Base64Decodificar de Criptografia', vscode.CompletionItemKind.Function, 'Base64Decodificar(b64: Texto) -> Texto', 'Base64Decodificar de Criptografia com (${1:b64})'),
      this.criarItem('Base64UrlCodificar de Criptografia', vscode.CompletionItemKind.Function, 'Base64UrlCodificar(texto: Texto) -> Texto', 'Base64UrlCodificar de Criptografia com (${1:texto})'),
      this.criarItem('Base64UrlDecodificar de Criptografia', vscode.CompletionItemKind.Function, 'Base64UrlDecodificar(b64: Texto) -> Texto', 'Base64UrlDecodificar de Criptografia com (${1:b64})'),
      this.criarItem('HexCodificar de Criptografia', vscode.CompletionItemKind.Function, 'HexCodificar(texto: Texto) -> Texto', 'HexCodificar de Criptografia com (${1:texto})'),
      this.criarItem('HexDecodificar de Criptografia', vscode.CompletionItemKind.Function, 'HexDecodificar(hexStr: Texto) -> Texto', 'HexDecodificar de Criptografia com (${1:hexStr})'),
      this.criarItem('Base32Codificar de Criptografia', vscode.CompletionItemKind.Function, 'Base32Codificar(texto: Texto) -> Texto', 'Base32Codificar de Criptografia com (${1:texto})'),
      this.criarItem('Base32Decodificar de Criptografia', vscode.CompletionItemKind.Function, 'Base32Decodificar(b32: Texto) -> Texto', 'Base32Decodificar de Criptografia com (${1:b32})'),
      this.criarItem('CifrarAES de Criptografia', vscode.CompletionItemKind.Function, 'CifrarAES(chave, texto: Texto) -> Texto', 'CifrarAES de Criptografia com (${1:chave}, ${2:texto})'),
      this.criarItem('DecifrarAES de Criptografia', vscode.CompletionItemKind.Function, 'DecifrarAES(chave, dadosCifrados: Texto) -> Texto', 'DecifrarAES de Criptografia com (${1:chave}, ${2:dadosCifrados})'),
      this.criarItem('CifraCesar de Criptografia', vscode.CompletionItemKind.Function, 'CifraCesar(texto: Texto, deslocamento: Inteiro) -> Texto', 'CifraCesar de Criptografia com (${1:texto}, ${2:deslocamento})'),
      this.criarItem('Rot13 de Criptografia', vscode.CompletionItemKind.Function, 'Rot13(texto: Texto) -> Texto', 'Rot13 de Criptografia com (${1:texto})'),
      this.criarItem('GerarUUID de Criptografia', vscode.CompletionItemKind.Function, 'GerarUUID() -> Texto', 'GerarUUID de Criptografia com ()'),
      this.criarItem('GerarToken de Criptografia', vscode.CompletionItemKind.Function, 'GerarToken(tamanho: Inteiro) -> Texto', 'GerarToken de Criptografia com (${1:tamanho})'),
      this.criarItem('GerarTextoAleatorio de Criptografia', vscode.CompletionItemKind.Function, 'GerarTextoAleatorio(tamanho: Inteiro) -> Texto', 'GerarTextoAleatorio de Criptografia com (${1:tamanho})'),
      this.criarItem('NumeroAleatorio de Criptografia', vscode.CompletionItemKind.Function, 'NumeroAleatorio(minimo, maximo: Inteiro) -> Inteiro', 'NumeroAleatorio de Criptografia com (${1:minimo}, ${2:maximo})'),
      this.criarItem('DecimalAleatorio de Criptografia', vscode.CompletionItemKind.Function, 'DecimalAleatorio() -> Decimal', 'DecimalAleatorio de Criptografia com ()'),
      this.criarItem('BooleanoAleatorio de Criptografia', vscode.CompletionItemKind.Function, 'BooleanoAleatorio() -> Lógico', 'BooleanoAleatorio de Criptografia com ()'),
      this.criarItem('EscolherAleatorio de Criptografia', vscode.CompletionItemKind.Function, 'EscolherAleatorio(lista: Lista) -> Qualquer', 'EscolherAleatorio de Criptografia com (${1:lista})'),
      this.criarItem('Embaralhar de Criptografia', vscode.CompletionItemKind.Function, 'Embaralhar(lista: Lista) -> Lista', 'Embaralhar de Criptografia com (${1:lista})')
    );
  }

  private criarItem(
    label: string,
    kind: vscode.CompletionItemKind,
    detail: string,
    snippet?: string
  ): vscode.CompletionItem {
    const item = new vscode.CompletionItem(label, kind);
    item.detail = detail;
    if (snippet) {
      item.insertText = new vscode.SnippetString(snippet);
    }
    return item;
  }
}

