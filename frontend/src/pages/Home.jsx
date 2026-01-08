import { useState } from "react";
import { useEffect } from "react";
import { apiNotes } from "../lib/api";
import Navbar from "../components/Navbar";
import RateLimitUI from "../components/RateLimitUI";
import { toast } from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
const Home = () => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch(`${apiNotes}`);

                if (!response.ok) {
                    if (response.status === 429) {
                        setIsRateLimited(true);
                        return;
                    }
                    throw new Error("Failed to fetch notes");
                }

                const data = await response.json();
                console.log("notes", data);
                setNotes(data);
                setLoading(false);
                setIsRateLimited(false);


            } catch (error) {
                console.log(error);
                if (error.response?.status === 429) {
                    setIsRateLimited(true)
                } else {
                    toast.error("Something went wrong");
                }

            } finally {
                setLoading(false)
            }
        };
        fetchNotes();

    }, [])
    return (
        <div className="min-h-screen">
            <Navbar />
            <h2 className="text-3xl font-semibold text-center mt-6">Your Notes</h2>

            {isRateLimited && <RateLimitUI />}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary font-bold py-10">Loading notes...</div>}
                {notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

                {notes.length > 0 && !loading && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes} />
                        ))}

                    </div>

                )}
            </div>
        </div>
    );
};

export default Home;