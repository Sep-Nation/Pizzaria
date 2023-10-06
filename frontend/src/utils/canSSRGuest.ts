import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

// Função para paginas que so podem ser acessas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);

    /** 
     * Se o usuário tentar acessar a pagina
     * porem tendo efetuado um login salvo
     * o mesmo sera redirecionado.
     */
    if(cookies['@nextauth.token']){
      return {
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
    }


    return await fn(ctx);
  }

}