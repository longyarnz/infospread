export default `
	schema {
		query: Query
		mutation: Mutation
	}

	type Query {
		palettes(options: UpdatePaletteInput, limit: Int, sort: String): [Palette]
		customers(options: UpdateCustomerInput, limit: Int, sort: String): [Customer]
		audience(options: UpdateAudienceInput, limit: Int, sort: String): [Audience]
		platforms(options: UpdatePlatformInput, limit: Int, sort: String): [Platform]
	}

	enum Sex{
		MALE
		FEMALE
	}

	type Palette {
		keyID: String
		caption: String
		title: String
		category: String
		author: Customer
		tags: [String]
		src_file: String
		createdAt: String
	}

	type Customer {
		keyID: String
		_name: String
		email: String
		sex: Sex
		phone: Float!
		palettes: [Palette]
	}

	type Audience {
		keyID: String
		_name: String
		email: String
		sex: Sex
		phone: Float!
		interests: [String]
	}

	type Platform {
		keyID: String
		title: String
		category: String
		src_file: String
		createdAt: String
	}

	type Report {
		palette: Boolean
		platform: Boolean
		audience: Boolean
		customer: Boolean
	}

	type Mutation {
		RegisterCustomer(users: CreateCustomerInput!): Customer!
		UpdateCustomer(user: UpdateCustomerInput!): Customer!
		CreatePalette(palettes: [CreatePaletteInput!]): [Palette!]!
		UpdatePalette(palette: UpdatePaletteInput!): Palette!
		RegisterAudience(viewers: CreateAudienceInput!): Audience!
		UpdateAudience(viewer: UpdateAudienceInput!): Audience!
		CreatePlatform(platforms: [CreatePlatformInput!]): [Platform!]!
		UpdatePlatform(platform: UpdatePlatformInput!): Platform!
		RemoveEntries(options: DeleteInput!): Report!
	}

	input CreateAudienceInput {
		_name: String!
		email: String!
		sex: Sex!
		phone: Float!
		interests: [String!]
	}

	input CreateCustomerInput {
		_name: String!
		email: String!
		sex: Sex!
		phone: Float!
	}

	input CreatePaletteInput {
		title: String!
		caption: String!
		category: String!
		author: String
		tags: [String!]
		src_file: String!
	}
	
	input CreatePlatformInput {
		title: String!
		category: String!
		src_file: String!
	}

	input UpdateAudienceInput {
		keyID: String!
		_name: String
		email: String
		sex: Sex
		phone: Float
		interests: [String!]
	}

	input UpdateCustomerInput {
		keyID: String!
		_name: String
		email: String
		sex: Sex
		phone: Float
		palettes: [String!]
	}

	input UpdatePaletteInput {
		keyID: String!
		title: String
		category: String
		author: String
		tags: [String!]
		src_file: String
	}
	
	input UpdatePlatformInput {
		keyID: String!
		title: String
		category: String
		src_file: String
	}

	input DeleteInput {
		palette: [String]
		platform: [String]
		audience: [String]
		customer: [String]
	}
`;