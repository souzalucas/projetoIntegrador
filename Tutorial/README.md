
# Docker

Docker é uma ferramenta projetada para facilitar a criação, a implementação e a execução de aplicativos usando containers.

Primeiramente temos que definir o que não é Docker. Docker não é um sistema de virtualização tradicional, enquanto em um ambiente de virtualização tradicional nós temos um Sistema Operacional completo e isolado, dentro do Docker nós temos recursos isolados que utilizam bibliotecas de kernel em comum.

Além de tudo, Docker é uma plataforma Open Source escrita em Go, que é uma linguagem de programação de alto desempenho desenvolvida dentro do Google, que facilita a criação e administração de ambientes isolados.

## Vantagens

- Com o uso de containers, o Docker acaba com a necessidade de executar um sistema operacional inteiro, como em uma máquina virtual por exemplo, para rodar um aplicativo, proporcionando ao usuário um ambiente portátil e com todas as necessidades básicas para sua execução.
- O Docker é perfeito para proporcionar um ambiente para a criação e compartilhamento de "Sistemas Operacionais com configurações customizadas" com alguns simples passos, e seu vasto registro de imagens e repositório de aplicações e dependências soluciona virtualmente todos os problemas relacionados à configuração de ambiente que um desenvolvedor possa ter.
- Excelente opção para se desenvolver e executar pequenas aplicações com simplicidade e maestria, garantindo aos desenvolvedores um ambiente leve e de simples configuração.
 - Permite que um desenvolvedor empacote um aplicativo com todas as partes que precisa, como bibliotecas e outras dependências, e envie tudo como um único pacote, assim facilitando muito o processo para que um desenvolvedor ou até qualquer outra pessoa possa usufruir da aplicação sem muitas dificuldades, sem o problema de “A aplicação não funciona na minha máquina”.
- Uma das grandes vantagens do Docker está em resolver o problema de executar aplicativos em sistemas incapacitados, seja por incompatibilidade do sistema, ou pela falta de programas, binários, bibliotecas ou dependências necessárias para a execução do aplicativo. Assim facilitando tanto os testes de aplicações quanto o desenvolvimento também.

## Desvantagens

- Uma possível desvantagem do Docker se encontra no fato de que, como este divide recursos entre outros containers e outros processos do sistema que o executa, uma aplicação que necessite por exemplo de um alto consumo de CPU terá seu desempenho prejudicado, comparado a executá-la em uma VM ou uma máquina comum.
- A comunicação entre o container e seu host, e o mapeamento de rede necessário para enviar os pacotes aos seus destinos corretos também impacta na performance de seus processos.
- Dificuldade na persistência dos dados, pois containers são elaborados para apagar totalmente seus arquivos quando são desligados, portanto qualquer armazenamento de dados para uso futuro teria que ser feito em algum outro lugar.
- O Docker foi criado com o intuito de executar aplicações de servidor que não necessitam de interfaces gráficas, portanto uma aplicação que precisa ser visualmente utilizada não seria própria para ser usada com a plataforma.

## Qual é o público do Docker?

O Docker é uma ferramenta projetada para beneficiar tanto os desenvolvedores quanto os administradores do sistema, tornando-o parte de muitas ferramentas de desenvolvimento.

## Instalando o Docker

O processo de instalação do Docker é simples, basta seguir os passos abaixo:

### 1. Iniciando

Primeiramente vamos atualizar o sistema para ter mais segurança e confiabilidade para a instalação do Docker. Execute os comandos abaixo em seu terminal:

```sh
$ sudo apt-get update
```

### 2. Configurar o repositório

Existem outras maneiras de instalar o docker, mas essa é a maneira mais recomendada, pois facilita as tarefas de instalação e atualização.

Instale pacotes para permitir que o apt use um repositório via HTTPS:

```sh
$ sudo apt-get install \ apt-transport-https \ ca-certificates \ curl \ gnupg2 \ software-properties-common
```

### 3. Adicionar chave GPG oficial do Docker
  
```sh
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

### 4. Configurar o repositório estável
```sh
$ sudo apt-add-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
```

### 5. Atualizar pacotes
```sh
$ sudo apt-get update
```

### 6. Instalando a versão mais recente do Docker
```sh
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```
  
### 7. Verificando se o Docker está instalado
```sh
$ docker -v
```

Caso tenha seguido esses passos e mesmo assim ocorreu erros, acesse o [site do Docker](https://docs.docker.com/install/), e verifique a forma de instalação específica para para sua distribuição linux.

Agora é so criar uma conta do [Docker Hub](https://hub.docker.com/) e utilizar os comandos: 

```sh
$ sudo su
$ docker login
```
Agora você já tem acesso a vários containers prontos, atualizações e a possibilidade de dar pull em seu containers.

### Utilizando o Docker

Para baixar uma imagem no Docker, é necessário que ela esteja no Docker Hub ou em algum outro repositório.
```sh
$ docker pull [nome da imagem]
```

O comando acima baixa a imagem e salva em sua máquina, assim você pode executar um ou mais containers a partir dessa imagem.

Listar todas as imagens baixadas:
```sh
$ docker images
```

Iniciar um container de uma imagem:  
```sh
$ docker run [nome da imagem]
```
  
Há diversos parâmetros que você pode usar no comando run, como por exemplo o comando (-p) que indica qual porta você quer externar para que a máquina consiga fazer requisições dentro do container. Todos esses comandos podem ser vistos [neste link](https://docs.docker.com/engine/reference/commandline/run/).

### Alguns comandos úteis:
```sh
$ docker ps # Lista os containers em execução
  
$ docker exec [container id] [comando] # Executa comandos dentro do container

$ docker stop $(docker ps -aq) # Para a execução de todos dos containers

$ docker rm $(docker ps -aq) # Exclui todos os containers criados
```

## Docker Compose

Quando precisamos definir uma aplicação composta por diversos serviços, é necessário executar cada serviço em seu próprio container e linká-los. Isso é possível através do Docker Compose.

Executando os comandos abaixo você baixa a versão estável atual do Docker Compose e aplica as permissões executáveis ​​ao binário:

```sh
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

$ sudo chmod +x /usr/local/bin/docker-compose
```

### Utilizando o Docker Compose

No exemplo a seguir iremos criar um ambiente de desenvolvimento com PHP e MySQL no servidor Apache.

[Arquivos do Projeto](https://github.com/souzalucas/docker-compose-php-mysql)

O arquivo base do Docker Compose é o `docker-compose.yml`, onde os serviços PHP e MySQL serão linkados. No mesmo diretório, criamos o arquivo `php7-apache2-dockerfile` que será referenciado pelo arquivo .yml como Dockerfile para a criação e configuração do PHP e Apache. Para testarmos o ambiente de desenvolvimento, criamos o diretório `html/index.php`.

Então teremos a seguinte estrutura de arquivos:

***docker-compose.yml
html
└── index.php
php7-apache2-dockerfile***

O arquivo `php7-apache2-dockerfile` contém as configurações do PHP e Apache, onde em ***FROM*** referenciamos a versão do PHP que encontramos no repositório do [Docker](https://hub.docker.com/), não é necessário já ter a imagem do PHP baixada, o Docker tomará conta disso. O ***WORKDIR***  diz ao container qual será o diretório de trabalho do Apache. Precisamos, para a conexão com o MySQL, instalar o MySQLi, para que isso seja possível utilizamos o serviço ***RUN***, que envia o comando de instalação para o container do PHP.

```
FROM php:7.2-apache
WORKDIR /var/www/html
RUN docker-php-ext-install mysqli
```

Em `docker-compose.yml` iremos linkar os serviços para a criação do ambiente de desenvolvimento, com isso temos o serviço ***apache***, onde em ***build:*** será referenciado o Dockerfile `php7-apache2-dockerfile`, em ***image:*** damos um nome para imagem a ser criada a partir do Dockerfile e logo após damos um nome ao container que será criado a partir dessa imagem, em ***ports:*** indicamos a porta do host que será mapeada para a porta do container e em ***volumes:*** mapeamos o diretório ./html do projeto para o diretório /var/www/html do container.

Agora para o serviço ***mysqldb*** damos um nome ao container a ser criado, podemos notar que diferente do serviço ***apache***, nós não utilizamos um Dockerfile para criar a imagem do MySQL, simplesmente referenciamos a imagem em ***image:*** com a versão encontrada no Docker Hub. Com a tag ***ports:*** Mapeamos a porta 3307 da nossa máquina real para a porta 3306 do container e em seguida enviamos as variáveis de ambiente necessárias para a criação do usuário e do banco de dados no MySQL.

```yml
version: '3'

services:
  apache:
    build:
      dockerfile: php7-apache2-dockerfile
      context: .
    image: seu-usuario/php7-apache2-dockerfile
    container_name: php7-apache2
    restart: always
    ports:
      - '80:80'
    volumes:
      - ./html:/var/www/html
    depends_on:
      - mysqldb
    links:
      - mysqldb

  mysqldb:
    container_name: mysqlServer
    image: mysql:5.7
    restart: always
    ports:
      - '3307:3306'
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=banco
```

É no `index.php` onde realizamos a conexão com o banco de dados utilizando o MySQLi.

```php
<html>
<?php
echo 'Versão Atual do PHP: ' . phpversion();
$servername = "mysqlServer";
$username = "root";
$password = "root";
// Criando Conexão
$conn = new mysqli($servername, $username, $password);
// Testando Conexão
if ($conn->connect_error) {
 die("Falha na Conexão: " . $conn->connect_error);
}
echo "<br /> Conexão Bem Sucedida";
?>

</html>
```

### Testando a Aplicação

Após termos entendido o funcionamento do Docker Compose, podemos agora rodar nossa aplicação. Basta executar o comando `$ docker-compose up` no seu terminal (é necessário estar no diretório do `docker-compose.yml`). Serão exibidas uma série de mensagens relacionadas ao Docker baixando as imagens dos containers pela primeira vez.

Se tudo der certo, ao acessar `http://localhost` no seu navegador você verá:

![](https://lh5.googleusercontent.com/zCvdfjB4rInm4nqC_5Uj2ZbMKzXhBpokb56uTiM5YllzswX240NnqeCVfR3tjMpsZ6Y7KdkR4zlg14dD1vksnSfbwlpR4n3NHoQHqWl0n1FYvwsmrvfmT2fB6108ZFqhy__awd-l)

# Comandos úteis

## ADMINISTRANDO CONTAINER DOCKER

Download e execução de imagem
```
$ docker run nomeImagem
```

Visualizar container em execução
```
$ docker ps
```

Imagens na máquina
```
$ docker images
```

Container que não estão em execução
```
$ docker ps -a
```

Execução iterativa da imagem
```
$ docker run -ti nomeImagem
```

Sair, mas manter o container em execução
```
ctrl + p + q
```
  
Voltar para container
```
$ docker attach containerID
```

Matar container
```
ctrl + d
```

Criar container sem executá lo
```
$ docker creat nomeImagem
```
  
Encerrar container
```
$ docker stop containerID
```

Iniciar container
```
$ docker start containerID
```

Pausar container
```
$ docker pause containerID
```
  
Voltar a executar container
```
$ docker unpause containerID
```
  
Visualizar utilização recursos pelo container
```
$ docker stats containerID
```
  
Remover container parado
```
$ docker rm containerID
```
 
Remover container em execução
```
$ docker rm -f containerID
```
  
## LIMITANDO CPU E MEMÓRIA E O DOCKER UPDATE

Iniciando e nomeando um container
```
$ run -ti --name nomeContainer nomeImagem
```
  
Mostrar informações de memória do container
```
$ docker inspect containerID | grep -i mem
```

Alterar limite de memória do container
```
$ docker run -ti --memory valorMem --name nomeContainer nomeImagem
```
  
Alterar limite de memória de um container em execução
```
$ docker update -m valorMem nomeContainer
```
  
Alterar limite de CPU do container
```
$ docker run -ti --cpu-shares valorCpu --name nomeContainer nomeImagem
```
  
Alterar limite de cpu de um container em execução
```
$ docker update --cpu-share valorCpu nomeContainer
```
  
## VOLUMES E CONTAINER DATA-ONLY (colocar diretório dentro do container, sem ele fazer parte do container)

Criando um volume
```
$ docker run -ti -v /nomeVolume nomeImagem /bin/bash
```
 
Montar partições
```
$ df -h
```
 
Visualizar volume criado no host docker
```
$ docker inspec -f {{.Mounts}} containerID
```
  
Criar um diretório no host docker
```
$ mkdir /root/nomeDiretorio
```

Criar volume apontando para o diretório
```
$ docker run -ti -v /root/nomeDiretório:/nomeVolume nomeImagem
```

Criar arquivo
```
$ touch nomeArquivo
```

Importar volume de outro container
```
$ docker run -d --name nomeContainer --volumes-from nomeVolume
```
  
## INSTRUÇÕES DOCKERFILE

Determinar imagem será usada como base
```
FROM nomeImagem
```

Definir quem escreve o container
```
MAINTAINER seuNome
```
  
Executar comandos no container
```
RUN apt-get update && apt-get install nomePacote && apt-get clean
```

Copiar uma arquivo, arquivo.tar ou diretório do host docker para dentro do container
```
ADD arquivo.txt /diretorio/
```
  
Parâmetro para o entrypoint
```
CMD [“sh”, “-c”, “echo”, “$HOME”]
```
  
Adicionar metadata
```
LABEL description=”bla bla bla bla”
```
  
Copiar um arquivo ou diretório para dentro do container
```
COPY arquivo.txt /diretorio/
```
  
Permitir que um processo seja o principal dentro do container(caso o processo morra, o container morre também)
```
ENTRYPOINT [“/usr/bin/nomeProcesso”, “-D”, “FOREGROUND”]
```
  
Determinar variáveis de ambiente para o container
```
ENV meunome=”seuNome”
```
  
Mostrar porta do container que está disponível
```
EXPOSE 80
```
  
Definir usuário default da imagem
```
USER seuNome
```
  
Definir um diretório do container como diretório raiz
```
WORKDIR /diretório
```
  
Criar um volume no container
```
VOLUME /diretorio
```
  
Como construir a imagem a partir do Dockerfile
```
$ docker build -t nomeNovoImagem:versão .
```

### Referências:
  
[1] Iniciando com o Docker: dicas práticas para começar a usar agora mesmo. Disponível em: ([https://tableless.com.br/iniciando-com-o-docker-dicas-praticas-para-comecar-usar-agora-mesmo/](https://tableless.com.br/iniciando-com-o-docker-dicas-praticas-para-comecar-usar-agora-mesmo/)), Acesso em 19 ago. 2019.

[2] Iniciando com o Docker: Criando suas próprias imagens. Disponível em: ([https://tableless.com.br/iniciando-com-o-docker-criando-suas-proprias-imagens/](https://tableless.com.br/iniciando-com-o-docker-criando-suas-proprias-imagens/)), Acesso em 20 ago. 2019.

[3] Ambiente de desenvolvimento PHP com Docker. Disponível em: ([https://medium.com/operacionalti/ambiente-de-desenvolvimento-php-com-docker-46e0eb2fac3d](https://medium.com/operacionalti/ambiente-de-desenvolvimento-php-com-docker-46e0eb2fac3d)), Acesso em 19 ago. 2019.

[4] Docker Hub Quickstart. Disponível em: ([https://docs.docker.com/docker-hub/](https://docs.docker.com/docker-hub/)), Acesso em 19 ago. 2019.

[5] VMS vs Containers: quais são as diferenças e os usos? Disponível em: ([https://imasters.com.br/desenvolvimento/vms-vs-containers-quais-diferencas-e-usos](https://imasters.com.br/desenvolvimento/vms-vs-containers-quais-diferencas-e-usos)), Acesso em 20 ago. 2019.

[6] Docker - Conclusão. Disponível em: ([https://www.gta.ufrj.br/ensino/eel879/trabalhos_vf_2017_2/docker/conclusion.html](https://www.gta.ufrj.br/ensino/eel879/trabalhos_vf_2017_2/docker/conclusion.html)), Acesso em 21 ago. 2019.

[7] Redes, vantagens e desvantagens. Disponível em: ([https://www.gta.ufrj.br/ensino/eel879/trabalhos_vf_2017_2/docker/network.html](https://www.gta.ufrj.br/ensino/eel879/trabalhos_vf_2017_2/docker/network.html)), Acesso em 19 ago. 2019.

[8] What is Docker? Disponível em: ([https://opensource.com/resources/what-docker](https://opensource.com/resources/what-docker)), Acesso em 20 ago. 2019.
