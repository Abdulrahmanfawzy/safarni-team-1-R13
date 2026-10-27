




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button, toast } from "@heroui/react";
import { logout } from "../../service/logout.service";


export default function ModalLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout(close: () => void) {
    try {
      setLoading(true);
      setError("");

      await logout();
      close();
      router.replace("/login");
      router.refresh();
     alert("logout successfully")
    } catch (error) {
  console.error("Logout failed:", error);
  setError(error instanceof Error ? error.message : "Unknown logout error");
} 
    
    
    finally {
      setLoading(false);
    }
  }

  return (
    <Modal>
      <Button variant="primary">Logout</Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            {({ close }) => (
              <>
                <Modal.CloseTrigger />

                <Modal.Header>
                  <Modal.Heading>Logout</Modal.Heading>
                </Modal.Header>

                <Modal.Body>
                  <h2 className="mx-6 text-xl font-semibold text-black">
                    Do you want to log out?
                  </h2>

                  {error && (
                    <p className="mt-3 text-sm text-red-600">{error}</p>
                  )}
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    className="bg-blue-600 text-white"
                    isDisabled={loading}
                    onPress={() => handleLogout(close)}
                  >
                    {loading ? "Logging out..." : "Yes, log me out"}
                  </Button>

                  <Button
                    variant="secondary"
                    slot="close"
                    isDisabled={loading}
                  >
                    No
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
