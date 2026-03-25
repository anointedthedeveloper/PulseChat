import { motion } from "framer-motion";

interface TypingIndicatorProps {
  users?: string[];
}

const TypingIndicator = ({ users = [] }: TypingIndicatorProps) => {
  const label = users.length === 0
    ? null
    : users.length === 1
    ? users[0]
    : users.length === 2
    ? `${users[0]}, ${users[1]}`
    : `${users[0]} and ${users.length - 1} others`;

  return (
    <div className="flex items-end gap-2 px-4 py-1">
      <div className="bg-received rounded-2xl rounded-bl-sm px-3 py-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>
        {label && (
          <span className="text-[11px] text-muted-foreground">{label}</span>
        )}
      </div>
    </div>
  );
};

export default TypingIndicator;
