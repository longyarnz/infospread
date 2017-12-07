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
		keyID: Int
		title: String
		category: String
		src_file: String
		createdAt: String
	}

	type Mutation {
		RegisterCustomer(user: CreateCustomerInput!): Customer!
		UpdateCustomer(user: UpdateCustomerInput!): Customer!
		CreatePalette(palette: [CreatePaletteInput!]): [Palette!]!
		UpdatePalette(palette: UpdatePaletteInput!): Palette!
		RegisterAudience(client: CreateAudienceInput!): Audience!
		UpdateAudience(client: UpdateAudienceInput!): Audience!
		CreatePlatform(platform: [CreatePlatformInput!]): [Platform!]!
		UpdatePlatform(platform: UpdatePlatformInput!): Platform!
		RemoveEntries(palette: String!, person: String!, platform: String!): Boolean!
	}

	input CreateAudienceInput {
		_name: String!
		email: String!
		sex: Sex!
		phone: Float!
		interests: [String!]!
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
		title: String
		category: String
		author: String
		tags: [String!]
		src_file: String
	}
	
	input UpdatePlatformInput {
		title: String
		category: String
		src_file: String
	}
`;