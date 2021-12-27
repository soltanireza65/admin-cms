export class Constants {
	public static stsAuthority = `${process.env.REACT_APP_AUTH_URL}/`;
	//
	public static clientId = process.env.REACT_APP_ODIC_CLIENT_ID;
	public static clientRoot = `${process.env.REACT_APP_OIDC_URL}/`;
	public static clientScope = process.env.REACT_APP_SCOPES;
}
