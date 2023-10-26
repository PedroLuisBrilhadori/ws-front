import { Message } from "@/models";
import { TextBody } from "./text-body";

export const MessageBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  if (message.type == "image")
    return <ImageBody message={message} truncate={truncate} />;

  return <TextBody text={message.message} truncate={truncate} />;
};

export const ImageBody = ({
  message,
  truncate,
}: {
  message: Message;
  truncate?: boolean;
}) => {
  const path = `http://localhost:3000/public/${message.id}.jpeg`;
  let attempt = 0;

  return (
    <div>
      <a target="_blank" href={path}>
        <img
          className="w-[300px] h-[300px] object-cover rounded-sm"
          onError={async ({ currentTarget }) => {
            if (attempt > 5) return;

            await new Promise((resolve, reject) => {
              setTimeout(resolve, 500);
            });

            currentTarget.onerror = null; // prevents looping
            currentTarget.src = path;
            attempt++;
          }}
          src={path}
        />
      </a>

      <TextBody text={message.message} truncate={truncate} />
    </div>
  );
};
