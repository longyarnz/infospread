export default `
	schema {
		query: Query
		mutation: Mutation
	}

	type Query {
		onePalette(options: String!): Palette
		oneCustomer(options: String!): Customer
		oneViewer(options: String!): Viewer
		onePlatform(options: String!): Platform
		palettes(options: UpdatePaletteInput, limit: Int, sort: String): [Palette]
		customers(options: UpdateCustomerInput, limit: Int, sort: String): [Customer]
		viewers(options: UpdateViewerInput, limit: Int, sort: String): [Viewer]
		platforms(options: UpdatePlatformInput, limit: Int, sort: String): [Platform]
	}

	enum Sex{
		MALE
		FEMALE
	}

	type Palette {
		_id: String
		caption: String
		title: String
		category: String
		author: Customer
		tags: [String]
		uri: String
		createdAt: String
	}

	type Customer {
		_id: String
		_name: String
		email: String
		sex: Sex
		phone: Float!
		palettes: [Palette]
	}

	type Viewer {
		_id: String
		_name: String
		email: String
		sex: Sex
		phone: Float!
		interests: [String]
	}

	type Platform {
		_id: String
		title: String
		category: String
		uri: String
		createdAt: String
	}

	type Report {
		palette: Boolean
		platform: Boolean
		viewer: Boolean
		customer: Boolean
	}

	type Mutation {
		CreateCustomer(users: CreateCustomerInput!): Customer!
		UpdateCustomer(user: UpdateCustomerInput!): Customer!
		CreatePalette(palettes: [CreatePaletteInput!]): [Palette!]!
		UpdatePalette(palette: UpdatePaletteInput!): Palette!
		CreateViewer(viewers: CreateViewerInput!): Viewer!
		UpdateViewer(viewer: UpdateViewerInput!): Viewer!
		CreatePlatform(platforms: [CreatePlatformInput!]): [Platform!]!
		UpdatePlatform(platform: UpdatePlatformInput!): Platform!
		RemoveEntries(options: DeleteInput!): Report!
	}

	input CreateViewerInput {
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
		uri: String!
	}
	
	input CreatePlatformInput {
		title: String!
		category: String!
		uri: String!
	}

	input UpdateViewerInput {
		_id: String
		_id: String
		_name: String
		email: String
		sex: Sex
		phone: Float
		interests: [String!]
	}

	input UpdateCustomerInput {
		_id: String
		_name: String
		email: String
		sex: Sex
		phone: Float
		palettes: [String!]
	}

	input UpdatePaletteInput {
		_id: String
		title: String
		category: String
		author: String
		tags: [String!]
		uri: String
	}
	
	input UpdatePlatformInput {
		_id: String
		title: String
		category: String
		uri: String
	}

	input DeleteInput {
		palette: [String]
		platform: [String]
		viewer: [String]
		customer: [String]
	}
`;