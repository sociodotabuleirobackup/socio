
import React from "react"
import { motion } from "framer-motion"

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Termos de uso do Dados (LGPD)
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6 text-gray-600">
          <p className="text-lg">
            A [nome do aplicativo] está comprometida com a proteção e privacidade de seus dados pessoais, 
            respeitando os requisitos estabelecidos pela Lei Geral de Proteção de Dados Pessoais (Lei n. 13.709/2018). 
            Ao utilizar nosso aplicativo, você concorda com os seguintes termos de uso dos seus dados.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Coleta de Dados Pessoais</h2>
            <p>
              Nós coletamos informações pessoais que você fornece ao criar uma conta no nosso aplicativo, 
              como nome, e-mail, telefone, endereço e dados de pagamento. Essas informações são necessárias 
              para que possamos prestar nossos serviços, incluindo:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Facilitar o aluguel de jogos de tabuleiro;</li>
              <li>Realizar a entrega dos jogos no endereço fornecido;</li>
              <li>Enviar comunicações relacionadas ao seu aluguel, como atualizações de pedidos, ofertas e promoções sobre o aplicativo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Uso de Dados Pessoais</h2>
            <p>Os dados pessoais coletados serão utilizados para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Processar e gerenciar o aluguel dos jogos de tabuleiro;</li>
              <li>Melhorar a experiência do usuário no aplicativo;</li>
              <li>Enviar notificações sobre ofertas, promoções e novidades que possam ser de seu interesse;</li>
              <li>Realizar pesquisas e análises estatísticas para melhorar nossos serviços e personalizar o conteúdo oferecido.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Compartilhamento de Dados</h2>
            <p>
              Nós não compartilhamos suas informações pessoais com terceiros, exceto em casos necessários 
              para a execução dos nossos serviços, como empresas de entrega e parceiros de pagamento, e 
              sempre em conformidade com as leis aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Segurança dos Dados</h2>
            <p>
              Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger suas 
              informações pessoais contra acessos não autorizados, perdas, destruições ou divulgações indevidas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Direito de Opt-Out</h2>
            <p>
              Você tem o direito de se opor ao recebimento de mensagens publicitárias enviadas por nós. 
              Caso não deseje mais receber nossas comunicações, você poderá exercer o direito de 
              opt-out/descadastramento a qualquer momento, enviando uma solicitação para o e-mail 
              <a href="mailto:lgpd@sociodotabuleiro.fun" className="text-blue-600 hover:text-blue-800"> 
                lgpd@sociodotabuleiro.fun
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Seus Direitos</h2>
            <p>Em conformidade com a Lei Geral de Proteção de Dados Pessoais, você tem direito a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Acessar as informações que temos sobre você;</li>
              <li>Corrigir dados pessoais incorretos ou desatualizados;</li>
              <li>Solicitar a exclusão dos seus dados pessoais, quando aplicável;</li>
              <li>Limitar o uso dos seus dados pessoais;</li>
              <li>Revogar o consentimento para o processamento dos seus dados pessoais.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Alterações nos Termos de Uso de Dados</h2>
            <p>
              Podemos modificar este termo periodicamente, de acordo com as alterações na legislação ou 
              melhorias nos nossos processos. Sempre que houver alterações significativas, você será 
              informado, e a nova versão estará disponível no nosso aplicativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Contato</h2>
            <p>
              Para exercer seus direitos, tirar dúvidas ou enviar reclamações, entre em contato conosco 
              através do e-mail 
              <a href="mailto:bruno@sociodotabuleiro.app.br" className="text-blue-600 hover:text-blue-800">
                bruno@sociodotabuleiro.app.br
              </a>
            </p>
          </section>

          <p className="text-lg font-medium mt-8">
            Ao utilizar nosso aplicativo, você concorda e está ciente das condições estabelecidas nestes 
            Termos de Uso de Dados.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
