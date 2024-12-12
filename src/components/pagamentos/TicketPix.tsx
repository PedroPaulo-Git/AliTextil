import { Button } from "../ui/button";

const TicketPix = () => {
  const mock_body = {
    payerFirstName: "João",
    payerLastName: "Silva",
    email: "joao.silva@example.com",
    identificationType: "CPF",
    identificationNumber: "12345678909",
    transactionAmount: 100,
    description: "Nome do Produto",
    paymentMethodId: "pix",
  };
  return (
    <div className=" absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-red-50 shadow-2xl w-72 h-72 flex flex-col text-center justify-between p-6 ">
        <h1 className="text-xl text-black">
          BEM-VINDO <br></br>ALI TEXTIL
        </h1>
        <div>
          <h1>Produto:</h1>
          <div>
            <ul >
              <li className="flex"> <p>nome:</p>{mock_body.description}</li>
              <li className="flex"><p>preço:</p>{mock_body.transactionAmount}</li>
              <li className="flex"> <p>método de pagamento:</p>{mock_body.paymentMethodId}</li>
            </ul>
           
            
           
          </div>
        </div>
        <Button>Pagar com pix</Button>
      </div>
    </div>
  );
};

export default TicketPix;
