## <div align="center">Controle de alunos do Estádio Municipal de Campo Mourão</div>
### <div align="center">Documento de descrição do software</div>
<div align="center">Setembro de 2019</div>

#### A – VISÃO GERAL 
O objetivo é a construção de um sistema capaz de controlar o uso do complexo desportivo de Campo Mourão, onde os alunos são matriculados em suas respectivas turmas para o uso da pista de atletismo, campo de futebol e piscina semiolímpica. O projeto consiste em uma aplicação Web responsiva capaz de ser acessada de qualquer navegador ou dispositivo, tanto móvel quanto desktop e em qualquer lugar, inclusive no próprio complexo, onde será feita a checagem de presença dos alunos. Beneficiando os administradores e alunos que o utilizarem, o sistema irá automatizar as funções básicas antes feitas manualmente pelos funcionários, lembrando também dos avisos, relatórios e informações básicas que serão disponibilizadas com mais facilidade aos usuários. O sistema disponibilizará a função de cadastro de alunos, assim como o cálculo e a geração de boletos de suas mensalidades, onde os funcionários da prefeitura poderão acompanhar a frequência dos alunos nas atividades e o pagamento das mensalidades dos mesmos, assim facilitando a utilização de todo o complexo.

#### B – REQUISITOS FUNCIONAIS 
O sistema fará o cadastro dos alunos e a criação de turmas de atividades, que terão dias e horários pré determinados.
O sistema permite cadastrar o valor da mensalidade de um aluno.
O valor da mensalidade é definido pelo tipo de atividade que ele realiza e a quantidade de dias por semana.
O aluno firma um contrato de 12 meses, sendo assim, o sistema deve permitir cadastrar os contratos dos alunos e emitir alertas quando o contrato está para vencer. A cada renovação é gerado um novo contrato com novas datas de início e término.
O sistema permite registrar a presença dos alunos nas atividades e emitir relatórios diários, semanais e mensais da frequência dos alunos.
Também é feita a emissão do boleto de pagamento e o controle de quem pagou ou não a mensalidade.
#### C – TECNOLOGIAS
Backend: **Node.js**

Frontend: **React**

SGBD: **MySQL**

Gerenciador de Tarefas: **Trello**

Hospedagem de código-fonte: **GitHub**
