import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import lpuLogo from "@/assets/lpu-logo.png";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNo && password) {
      toast.success("Login successful!");
      navigate("/app");
    } else {
      toast.error("Please enter registration number and password");
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--gradient-primary)" }}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8 animate-fade-in">
        <img 
          src={lpuLogo} 
          alt="Lovely Professional University" 
          className="w-48 h-auto mb-4"
        />
        
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="text"
              placeholder="Reg No"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="px-12 h-14 rounded-full text-center bg-input shadow-md"
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-12 h-14 rounded-full text-center bg-input shadow-md"
            />
          </div>
          
          <Button 
            type="submit"
            variant="auth"
            className="w-40 h-12 rounded-full mx-auto block mt-6"
          >
            LOG IN
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
