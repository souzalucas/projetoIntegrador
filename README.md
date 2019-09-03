## <div align="center">Controle de alunos do Estádio Municipal de Campo Mourão</div>
### <div align="center">Documento de descrição do software</div>
<div align="center">Setembro de 2019</div>

#### A – VISÃO GERAL 
O objetivo é a construção de um sistema capaz de controlar os alunos e as turmas que utilizam o complexo esportivo do estádio municipal. O projeto se baseia em uma aplicação Web responsiva, capaz de ser acessada de qualquer navegador ou dispositivo, tanto móvel quanto desktop e em qualquer lugar, inclusive no próprio complexo, onde será feita a checagem de presença dos alunos. Beneficiando os administradores e alunos que à utilizarem, automatizando funções básicas, antes feitas manualmente por funcionários, lembrando também, dos avisos, relatórios e informações básicas que serão disponibilizadas mais facilmente aos usuários. Será possível a realização de cadastro, cálculo e geração de boletos referentes a mensalidade dos alunos, acompanhar a frequência e o pagamento da mensalidade dos alunos. Assim, facilitando a utilização de todo o complexo.

#### B – REQUISITOS FUNCIONAIS 
O sistema fará o cadastro dos alunos e a criação de turmas de atividades, que tem dias e horários pré determinados.
O sistema permite cadastrar o valor da mensalidade de um aluno.
(O valor da mensalidade é definido pelo tipo de atividade que ele realiza e quantidade de dias por semana)
O aluno firma um contrato de 12 meses, sendo assim, o sistema deve permitir cadastrar os contratos dos alunos e emitir alertas quando o contrato está para vencer. A cada renovação é gerado um novo contrato com novas datas de início e término.
O sistema permite registrar a presença dos alunos nas atividades e emitir relatórios diários, semanais e mensais da frequência dos alunos.
Também é feita a emissão de boleto de pagamento e assim controlar quem já pagou ou não a mensalidade.
#### C – TECNOLOGIAS
Será utilizado node.js para implementação do *backend*, no *frontend* será usado o *React*. Para o banco de dados será utilizado *mysql*. Para o gerenciamento de tarefas utilizaremos o aplicativo *Trello*. Para hospedar o código-fonte com controle de versão, será usado o *github*.

