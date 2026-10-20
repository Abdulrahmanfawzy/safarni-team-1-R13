



import { ButtonDataAttributes } from "@base-ui/react";
import { Modal, Button } from "@heroui/react";



export default function ModalLogout() {
  return (
    <div>
         <Modal>
      <Button variant="primary"> Logout</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading> Logout</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p> 

  <h2 className='text-black font-semibold mx-6 text-2xl'>Do You Want To Register The Exit <br /> Already ? </h2>

<div className="flex gap-2">

<button className="bg-blue-600 mt-4 rounded-2xl py-2 px-8"> yes , log me out </button>
<button className=" mt-4 text-black border w-1/2 rounded-2xl py-2 px-12"> No </button>
</div>



              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className={"text-red-600 font-semibold"} slot="close" variant="secondary">
                close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>


    </div>
  )
}
