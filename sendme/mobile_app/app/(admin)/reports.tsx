import { FeatureRouteScreen } from '../../src/features/shared/feature-route-screen';
import { routeContent } from '../../src/features/shared/route-content';

export default function ReportsScreen() {
  return <FeatureRouteScreen {...routeContent.adminReports} />;
}
