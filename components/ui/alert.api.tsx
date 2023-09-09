import { Server } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";

interface AlertApiProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<AlertApiProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<AlertApiProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "default",
};

const AlertApi: React.FC<AlertApiProps> = ({ title, description, variant = "public" }) => {
  return (
    <>
      <Alert>
        <Server className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-x-2">
          {title}
          <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </AlertTitle>
      </Alert>
    </>
  );
};

export default AlertApi;
