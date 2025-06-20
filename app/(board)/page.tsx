import { Instructions } from "@/components/atoms/instructions";
import InvitationCard from "@/components/atoms/invitation-card";

export default function Page() {
    return (
        <main className="p-4">
            <h1 className="mx-auto text-4xl font-serif font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Thiệp mời <Instructions /></h1>
            <InvitationCard />
        </main>
    );
}
