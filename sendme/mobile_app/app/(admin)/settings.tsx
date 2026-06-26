import { ProfileSummaryScreen } from '../../src/features/auth/profile-summary-screen';

export default function SettingsScreen() {
  return (
    <ProfileSummaryScreen
      title="Admin settings"
      subtitle="View the current admin account and sign out securely."
    />
  );
}
