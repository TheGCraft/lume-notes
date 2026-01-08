import { ZapIcon } from "lucide-react";
const RateLimitUI = () => {
    return (
        <div className="flex items-center justify-center max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center">
                <div className="bg-primary border border-primary/20 text-primary-content p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary-content">
                            <ZapIcon className="size-20 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">Rate Limit Exceeded</h3>
                            <p className="text-base-content mb-1 text-black">You've made too many requests. Please try again later.</p>
                            <p className="text-left text-sm text-black-200">You can try again in 1 minute.</p>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    );
};
export default RateLimitUI;