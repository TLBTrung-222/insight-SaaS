import { Send } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface ChatInputProps {
    isDisabled: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
    return (
        <div className="absolute bottom-0 left-0 w-full">
            <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex h-full flex-1 items-stretch md:flex-col">
                    <div className="relative flex flex-col w-full flex-grow p-4">
                        <div className="relative">
                            <Textarea
                                rows={1}
                                autoFocus
                                // onChange={handleInputChange}
                                // value={message}
                                // onKeyDown={(e) => {
                                //     if (e.key === "Enter" && !e.shiftKey) {
                                //         e.preventDefault();

                                //         addMessage();

                                //         textareaRef.current?.focus();
                                //     }
                                // }}
                                placeholder="Enter your question..."
                            />

                            <Button className="absolute right-[0px] top-0 h-full">
                                <Send className="w-4 h-4" />{" "}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
