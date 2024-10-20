import Admin from "./components/admin";
import ClientLayout from "./layout.client";
import ServerLayout from "./layout.server";




export default function Home() {


  return (
   <ServerLayout>
    <ClientLayout>
    <Admin />
    </ClientLayout>
   </ServerLayout>
  );
}
