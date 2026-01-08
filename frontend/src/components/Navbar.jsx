import { Link } from "react-router";
import { PlusIcon, Notebook } from "lucide-react";
const Navbar = () => {
    return (
        <header className="bg-base-300 border-b border-base-content/10">
            <div className="mx-auto max-w-6xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-5xl font-bold text-primary font-sans tracking-tight">Lume <Notebook className="size-8 text-primary inline"></Notebook></h1>
                    <p className="text-sm text-base-content/50">Updated {new Date().toDateString()}</p>
                    <div className="flex items-center gap-4">
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>Create</span>
                        </Link>

                    </div>

                </div>

            </div>
        </header>
    );
};
export default Navbar;