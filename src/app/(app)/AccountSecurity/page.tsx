import GoBack from "@/components/shared/GoBack/page";
import SecurityToggleRow from "../profile/_components/SecurityToggleRow/page";
import SecurityActionCard from "../profile/_components/SecurityCard/page";





export default function AccountSecurity() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-8">

      <GoBack />

      <section className="mt-5 rounded-lg border border-indigo-400 px-5 pb-5">
        <h1 className="py-5 text-center text-lg font-semibold text-slate-900">
          Account & Security
        </h1>

        <div className="divide-y divide-slate-100">
          <SecurityToggleRow label="Biometric ID" />
          <SecurityToggleRow label="Face ID" />
        </div>

        <div className="mt-4 space-y-3">
          <SecurityActionCard
            title="Device Management"
            description="Manage your account on the various devices you own."
          />
          <SecurityActionCard
            title="Deactivate Account"
            description="Temporarily deactivate your account. Easily reactivate when you're ready."
          />
          <SecurityActionCard
            title="Delete Account"
            description="Permanently remove your account and data from Tripmate. Proceed with caution."
            variant="danger"
          />
        </div>
      </section>
    </main>
  );
}

