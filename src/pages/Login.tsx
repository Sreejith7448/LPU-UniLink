import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import lpuLogo from "@/assets/lpu-logo.png";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNo || !password) {
      toast.error("Please enter registration number and password");
      return;
    }

    const email = `${regNo}@lpu.student`;

    try {
      if (isSignup) {
        // Sign up new user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          if (signUpError.message.includes("already registered")) {
            toast.error("Account already exists. Please login instead.");
            setIsSignup(false);
          } else {
            throw signUpError;
          }
          return;
        }

        if (signUpData.user) {
          // Create profile
          await supabase.from("profiles").upsert({
            user_id: signUpData.user.id,
            name: "Student",
            reg_no: regNo,
          });

          toast.success("Account created successfully!");
          navigate("/app");
        }
      } else {
        // Login existing user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          if (signInError.message.includes("Invalid login credentials")) {
            toast.error("Invalid credentials. Don't have an account? Sign up instead.");
          } else {
            throw signInError;
          }
          return;
        }

        toast.success("Login successful!");
        navigate("/app");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
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
        
        <form onSubmit={handleSubmit} className="w-full space-y-4">
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
            {isSignup ? "SIGN UP" : "LOG IN"}
          </Button>

          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="w-full text-center text-sm text-primary-foreground/80 hover:text-primary-foreground mt-4"
          >
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
