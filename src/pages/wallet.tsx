import { Wallet } from '$application/components/pages/Wallet';
import withAuthentication from '$application/lib/hoc/withAuthentication';

export default withAuthentication(Wallet);
