import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Trash2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { apiNotes } from "../lib/api";
const NoteDetailPage = () => {
    const [note, setNote] = useState({}); //empty object because the note doesn't exist yet
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(
        () => {
            const fetchNote = async () => {
                try {
                    const response = await fetch(`${apiNotes}/${id}`);

                    if (!response.ok) {
                        throw new Error("Failed to fetch note");
                    }
                    const data = await response.json();
                    setNote(data);

                } catch (error) {
                    console.log("Error fetching note", error);
                    toast.error("Error fetching note");

                } finally {
                    setLoading(false);

                }


            }
            fetchNote();

        },
        [id]


    );
    //handle save
    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("All fields are required");
            return;
        }
        setSaving(true);
        try {
            const response = await fetch(`${apiNotes}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: note.title,
                    content: note.content
                })
            })
            if (!response.ok) {
                throw new Error("Failed to save note");
            }
            const data = await response.json();
            toast.success("Note saved");
            navigate("/");

        } catch (error) {
            console.log("Error saving note", error);
            toast.error("Error saving note");

        }
        finally {
            setSaving(false); //reset the saving state is important to avoid infinite loading



        }
    }
    //handle delete
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            const response = await fetch(`${apiNotes}/${id}`, { method: "DELETE" })
            if (!response.ok) {
                throw new Error("Failed to delete note");

            }
            toast.success("Noted deleted");
            navigate("/"); //Navigate to the home page after deleting the note

        } catch (error) {
            console.log("Error deleting the note", error);
            toast.error("Error deleting note");

        } finally {
            setLoading(false); //reset the loading state is important to avoid infinite loading

        }
    }
    //loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoaderIcon className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></LoaderIcon>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className=" flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="size-5" />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="size-5" />
                            Delete Note
                        </button>
                    </div>
                    <div className="card bg-base-300">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note Title"
                                    className="input input-bordered"
                                    value={note.title}
                                    onChange={(e) => setNote({
                                        ...note, title: e.target.value //spread operator to copy the note object and update the title
                                    })

                                    }
                                />

                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered h-32 w-full overflow-hidden text-ellipsis whitespace-normal"
                                    value={note.content}
                                    onChange={(e) => setNote({
                                        ...note, content: e.target.value
                                    })

                                    }
                                />

                            </div>
                            <div className="card actions justify-end">
                                <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default NoteDetailPage;