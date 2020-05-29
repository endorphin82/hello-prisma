import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Prisma Client JS version: 2.0.0-beta.6
 * Query Engine version: c48b94aa8d1d9a0e5582dcd14e25202b76303dca
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${1} OR email = ${'e@ma.il'};`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'e@ma.il')
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): PostDelegate;

  /**
   * `prisma.profile`: Exposes CRUD operations for the **Profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Profiles
    * const profiles = await prisma.profile.findMany()
    * ```
    */
  get profile(): ProfileDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model Post
 */

export type Post = {
  authorId: number
  content: string | null
  createdAt: Date
  id: number
  published: boolean
  title: string
}

export type PostSelect = {
  authorId?: boolean
  content?: boolean
  createdAt?: boolean
  id?: boolean
  published?: boolean
  title?: boolean
  author?: boolean | UserArgs
}

export type PostInclude = {
  author?: boolean | UserArgs
}

export type PostGetPayload<
  S extends boolean | null | undefined | PostArgs,
  U = keyof S
> = S extends true
  ? Post
  : S extends undefined
  ? never
  : S extends PostArgs | FindManyPostArgs
  ? 'include' extends U
    ? Post  & {
      [P in TrueKeys<S['include']>]:
      P extends 'author'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Post ? Post[P]
: 
      P extends 'author'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Post
: Post


export interface PostDelegate {
  /**
   * Find zero or one Post.
   * @param {FindOnePostArgs} args - Arguments to find a Post
   * @example
   * // Get one Post
   * const post = await prisma.post.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnePostArgs>(
    args: Subset<T, FindOnePostArgs>
  ): CheckSelect<T, PostClient<Post | null>, PostClient<PostGetPayload<T> | null>>
  /**
   * Find zero or more Posts.
   * @param {FindManyPostArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Posts
   * const posts = await prisma.post.findMany()
   * 
   * // Get first 10 Posts
   * const posts = await prisma.post.findMany({ first: 10 })
   * 
   * // Only select the `authorId`
   * const postWithAuthorIdOnly = await prisma.post.findMany({ select: { authorId: true } })
   * 
  **/
  findMany<T extends FindManyPostArgs>(
    args?: Subset<T, FindManyPostArgs>
  ): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>
  /**
   * Create a Post.
   * @param {PostCreateArgs} args - Arguments to create a Post.
   * @example
   * // Create one Post
   * const user = await prisma.post.create({
   *   data: {
   *     // ... data to create a Post
   *   }
   * })
   * 
  **/
  create<T extends PostCreateArgs>(
    args: Subset<T, PostCreateArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Delete a Post.
   * @param {PostDeleteArgs} args - Arguments to delete one Post.
   * @example
   * // Delete one Post
   * const user = await prisma.post.delete({
   *   where: {
   *     // ... filter to delete one Post
   *   }
   * })
   * 
  **/
  delete<T extends PostDeleteArgs>(
    args: Subset<T, PostDeleteArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Update one Post.
   * @param {PostUpdateArgs} args - Arguments to update one Post.
   * @example
   * // Update one Post
   * const post = await prisma.post.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends PostUpdateArgs>(
    args: Subset<T, PostUpdateArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * Delete zero or more Posts.
   * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
   * @example
   * // Delete a few Posts
   * const { count } = await prisma.post.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends PostDeleteManyArgs>(
    args: Subset<T, PostDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Posts.
   * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Posts
   * const post = await prisma.post.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends PostUpdateManyArgs>(
    args: Subset<T, PostUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Post.
   * @param {PostUpsertArgs} args - Arguments to update or create a Post.
   * @example
   * // Update or create a Post
   * const post = await prisma.post.upsert({
   *   create: {
   *     // ... data to create a Post
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Post we want to update
   *   }
   * })
  **/
  upsert<T extends PostUpsertArgs>(
    args: Subset<T, PostUpsertArgs>
  ): CheckSelect<T, PostClient<Post>, PostClient<PostGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyPostArgs, 'select' | 'include'>): Promise<number>
}

export declare class PostClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  author<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Post findOne
 */
export type FindOnePostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Post to fetch.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post findMany
 */
export type FindManyPostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter, which Posts to fetch.
  **/
  where?: PostWhereInput
  /**
   * Determine the order of the Posts to fetch.
  **/
  orderBy?: PostOrderByInput
  /**
   * Skip the first `n` Posts.
  **/
  skip?: number
  /**
   * Get all Posts that come after the Post you provide with the current order.
  **/
  after?: PostWhereUniqueInput
  /**
   * Get all Posts that come before the Post you provide with the current order.
  **/
  before?: PostWhereUniqueInput
  /**
   * Get the first `n` Posts.
  **/
  first?: number
  /**
   * Get the last `n` Posts.
  **/
  last?: number
}


/**
 * Post create
 */
export type PostCreateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to create a Post.
  **/
  data: PostCreateInput
}


/**
 * Post update
 */
export type PostUpdateArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The data needed to update a Post.
  **/
  data: PostUpdateInput
  /**
   * Choose, which Post to update.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post updateMany
 */
export type PostUpdateManyArgs = {
  data: PostUpdateManyMutationInput
  where?: PostWhereInput
}


/**
 * Post upsert
 */
export type PostUpsertArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * The filter to search for the Post to update in case it exists.
  **/
  where: PostWhereUniqueInput
  /**
   * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
  **/
  create: PostCreateInput
  /**
   * In case the Post was found with the provided `where` argument, update it with this data.
  **/
  update: PostUpdateInput
}


/**
 * Post delete
 */
export type PostDeleteArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
  /**
   * Filter which Post to delete.
  **/
  where: PostWhereUniqueInput
}


/**
 * Post deleteMany
 */
export type PostDeleteManyArgs = {
  where?: PostWhereInput
}


/**
 * Post without action
 */
export type PostArgs = {
  /**
   * Select specific fields to fetch from the Post
  **/
  select?: PostSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: PostInclude | null
}



/**
 * Model Profile
 */

export type Profile = {
  bio: string | null
  id: number
  userId: number
}

export type ProfileSelect = {
  bio?: boolean
  id?: boolean
  userId?: boolean
  user?: boolean | UserArgs
}

export type ProfileInclude = {
  user?: boolean | UserArgs
}

export type ProfileGetPayload<
  S extends boolean | null | undefined | ProfileArgs,
  U = keyof S
> = S extends true
  ? Profile
  : S extends undefined
  ? never
  : S extends ProfileArgs | FindManyProfileArgs
  ? 'include' extends U
    ? Profile  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? UserGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Profile ? Profile[P]
: 
      P extends 'user'
      ? UserGetPayload<S['select'][P]> : never
    }
  : Profile
: Profile


export interface ProfileDelegate {
  /**
   * Find zero or one Profile.
   * @param {FindOneProfileArgs} args - Arguments to find a Profile
   * @example
   * // Get one Profile
   * const profile = await prisma.profile.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneProfileArgs>(
    args: Subset<T, FindOneProfileArgs>
  ): CheckSelect<T, ProfileClient<Profile | null>, ProfileClient<ProfileGetPayload<T> | null>>
  /**
   * Find zero or more Profiles.
   * @param {FindManyProfileArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Profiles
   * const profiles = await prisma.profile.findMany()
   * 
   * // Get first 10 Profiles
   * const profiles = await prisma.profile.findMany({ first: 10 })
   * 
   * // Only select the `bio`
   * const profileWithBioOnly = await prisma.profile.findMany({ select: { bio: true } })
   * 
  **/
  findMany<T extends FindManyProfileArgs>(
    args?: Subset<T, FindManyProfileArgs>
  ): CheckSelect<T, Promise<Array<Profile>>, Promise<Array<ProfileGetPayload<T>>>>
  /**
   * Create a Profile.
   * @param {ProfileCreateArgs} args - Arguments to create a Profile.
   * @example
   * // Create one Profile
   * const user = await prisma.profile.create({
   *   data: {
   *     // ... data to create a Profile
   *   }
   * })
   * 
  **/
  create<T extends ProfileCreateArgs>(
    args: Subset<T, ProfileCreateArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete a Profile.
   * @param {ProfileDeleteArgs} args - Arguments to delete one Profile.
   * @example
   * // Delete one Profile
   * const user = await prisma.profile.delete({
   *   where: {
   *     // ... filter to delete one Profile
   *   }
   * })
   * 
  **/
  delete<T extends ProfileDeleteArgs>(
    args: Subset<T, ProfileDeleteArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * Update one Profile.
   * @param {ProfileUpdateArgs} args - Arguments to update one Profile.
   * @example
   * // Update one Profile
   * const profile = await prisma.profile.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ProfileUpdateArgs>(
    args: Subset<T, ProfileUpdateArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * Delete zero or more Profiles.
   * @param {ProfileDeleteManyArgs} args - Arguments to filter Profiles to delete.
   * @example
   * // Delete a few Profiles
   * const { count } = await prisma.profile.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ProfileDeleteManyArgs>(
    args: Subset<T, ProfileDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Profiles.
   * @param {ProfileUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Profiles
   * const profile = await prisma.profile.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ProfileUpdateManyArgs>(
    args: Subset<T, ProfileUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Profile.
   * @param {ProfileUpsertArgs} args - Arguments to update or create a Profile.
   * @example
   * // Update or create a Profile
   * const profile = await prisma.profile.upsert({
   *   create: {
   *     // ... data to create a Profile
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Profile we want to update
   *   }
   * })
  **/
  upsert<T extends ProfileUpsertArgs>(
    args: Subset<T, ProfileUpsertArgs>
  ): CheckSelect<T, ProfileClient<Profile>, ProfileClient<ProfileGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyProfileArgs, 'select' | 'include'>): Promise<number>
}

export declare class ProfileClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Profile findOne
 */
export type FindOneProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profile to fetch.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile findMany
 */
export type FindManyProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter, which Profiles to fetch.
  **/
  where?: ProfileWhereInput
  /**
   * Determine the order of the Profiles to fetch.
  **/
  orderBy?: ProfileOrderByInput
  /**
   * Skip the first `n` Profiles.
  **/
  skip?: number
  /**
   * Get all Profiles that come after the Profile you provide with the current order.
  **/
  after?: ProfileWhereUniqueInput
  /**
   * Get all Profiles that come before the Profile you provide with the current order.
  **/
  before?: ProfileWhereUniqueInput
  /**
   * Get the first `n` Profiles.
  **/
  first?: number
  /**
   * Get the last `n` Profiles.
  **/
  last?: number
}


/**
 * Profile create
 */
export type ProfileCreateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to create a Profile.
  **/
  data: ProfileCreateInput
}


/**
 * Profile update
 */
export type ProfileUpdateArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The data needed to update a Profile.
  **/
  data: ProfileUpdateInput
  /**
   * Choose, which Profile to update.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile updateMany
 */
export type ProfileUpdateManyArgs = {
  data: ProfileUpdateManyMutationInput
  where?: ProfileWhereInput
}


/**
 * Profile upsert
 */
export type ProfileUpsertArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * The filter to search for the Profile to update in case it exists.
  **/
  where: ProfileWhereUniqueInput
  /**
   * In case the Profile found by the `where` argument doesn't exist, create a new Profile with this data.
  **/
  create: ProfileCreateInput
  /**
   * In case the Profile was found with the provided `where` argument, update it with this data.
  **/
  update: ProfileUpdateInput
}


/**
 * Profile delete
 */
export type ProfileDeleteArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
  /**
   * Filter which Profile to delete.
  **/
  where: ProfileWhereUniqueInput
}


/**
 * Profile deleteMany
 */
export type ProfileDeleteManyArgs = {
  where?: ProfileWhereInput
}


/**
 * Profile without action
 */
export type ProfileArgs = {
  /**
   * Select specific fields to fetch from the Profile
  **/
  select?: ProfileSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ProfileInclude | null
}



/**
 * Model User
 */

export type User = {
  email: string
  id: number
  name: string | null
}

export type UserSelect = {
  email?: boolean
  id?: boolean
  name?: boolean
  posts?: boolean | FindManyPostArgs
  profile?: boolean | ProfileArgs
}

export type UserInclude = {
  posts?: boolean | FindManyPostArgs
  profile?: boolean | ProfileArgs
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User  & {
      [P in TrueKeys<S['include']>]:
      P extends 'posts'
      ? Array<PostGetPayload<S['include'][P]>> :
      P extends 'profile'
      ? ProfileGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
      P extends 'posts'
      ? Array<PostGetPayload<S['select'][P]>> :
      P extends 'profile'
      ? ProfileGetPayload<S['select'][P]> | null : never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, UserClient<User | null>, UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ first: 10 })
   * 
   * // Only select the `email`
   * const userWithEmailOnly = await prisma.user.findMany({ select: { email: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const user = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const user = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, UserClient<User>, UserClient<UserGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>
}

export declare class UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  posts<T extends FindManyPostArgs = {}>(args?: Subset<T, FindManyPostArgs>): CheckSelect<T, Promise<Array<Post>>, Promise<Array<PostGetPayload<T>>>>;

  profile<T extends ProfileArgs = {}>(args?: Subset<T, ProfileArgs>): CheckSelect<T, ProfileClient<Profile | null>, ProfileClient<ProfileGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: UserOrderByInput
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  /**
   * Get all Users that come after the User you provide with the current order.
  **/
  after?: UserWhereUniqueInput
  /**
   * Get all Users that come before the User you provide with the current order.
  **/
  before?: UserWhereUniqueInput
  /**
   * Get the first `n` Users.
  **/
  first?: number
  /**
   * Get the last `n` Users.
  **/
  last?: number
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: UserInclude | null
}



/**
 * Deep Input Types
 */


export type ProfileWhereInput = {
  bio?: string | NullableStringFilter | null
  id?: number | IntFilter
  userId?: number | IntFilter
  AND?: Enumerable<ProfileWhereInput>
  OR?: Enumerable<ProfileWhereInput>
  NOT?: Enumerable<ProfileWhereInput>
  user?: UserWhereInput | null
}

export type UserWhereInput = {
  email?: string | StringFilter
  id?: number | IntFilter
  name?: string | NullableStringFilter | null
  posts?: PostFilter | null
  AND?: Enumerable<UserWhereInput>
  OR?: Enumerable<UserWhereInput>
  NOT?: Enumerable<UserWhereInput>
  profile?: ProfileWhereInput | null
}

export type PostWhereInput = {
  authorId?: number | IntFilter
  content?: string | NullableStringFilter | null
  createdAt?: Date | string | DateTimeFilter
  id?: number | IntFilter
  published?: boolean | BooleanFilter
  title?: string | StringFilter
  AND?: Enumerable<PostWhereInput>
  OR?: Enumerable<PostWhereInput>
  NOT?: Enumerable<PostWhereInput>
  author?: UserWhereInput | null
}

export type PostWhereUniqueInput = {
  id?: number
}

export type ProfileWhereUniqueInput = {
  id?: number
  userId?: number
}

export type UserWhereUniqueInput = {
  email?: string
  id?: number
}

export type ProfileCreateWithoutUserInput = {
  bio?: string | null
}

export type ProfileCreateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
}

export type UserCreateWithoutPostsInput = {
  email: string
  name?: string | null
  profile?: ProfileCreateOneWithoutUserInput | null
}

export type UserCreateOneWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
}

export type PostCreateInput = {
  content?: string | null
  createdAt?: Date | string
  published?: boolean
  title: string
  author: UserCreateOneWithoutPostsInput
}

export type ProfileUpdateWithoutUserDataInput = {
  bio?: string | null
  id?: number
}

export type ProfileUpsertWithoutUserInput = {
  update: ProfileUpdateWithoutUserDataInput
  create: ProfileCreateWithoutUserInput
}

export type ProfileUpdateOneWithoutUserInput = {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ProfileUpdateWithoutUserDataInput
  upsert?: ProfileUpsertWithoutUserInput
}

export type UserUpdateWithoutPostsDataInput = {
  email?: string
  id?: number
  name?: string | null
  profile?: ProfileUpdateOneWithoutUserInput
}

export type UserUpsertWithoutPostsInput = {
  update: UserUpdateWithoutPostsDataInput
  create: UserCreateWithoutPostsInput
}

export type UserUpdateOneRequiredWithoutPostsInput = {
  create?: UserCreateWithoutPostsInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutPostsDataInput
  upsert?: UserUpsertWithoutPostsInput
}

export type PostUpdateInput = {
  content?: string | null
  createdAt?: Date | string
  id?: number
  published?: boolean
  title?: string
  author?: UserUpdateOneRequiredWithoutPostsInput
}

export type PostUpdateManyMutationInput = {
  content?: string | null
  createdAt?: Date | string
  id?: number
  published?: boolean
  title?: string
}

export type PostCreateWithoutAuthorInput = {
  content?: string | null
  createdAt?: Date | string
  published?: boolean
  title: string
}

export type PostCreateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput>
  connect?: Enumerable<PostWhereUniqueInput>
}

export type UserCreateWithoutProfileInput = {
  email: string
  name?: string | null
  posts?: PostCreateManyWithoutAuthorInput | null
}

export type UserCreateOneWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
}

export type ProfileCreateInput = {
  bio?: string | null
  user: UserCreateOneWithoutProfileInput
}

export type PostUpdateWithoutAuthorDataInput = {
  content?: string | null
  createdAt?: Date | string
  id?: number
  published?: boolean
  title?: string
}

export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  data: PostUpdateWithoutAuthorDataInput
}

export type PostScalarWhereInput = {
  authorId?: number | IntFilter
  content?: string | NullableStringFilter | null
  createdAt?: Date | string | DateTimeFilter
  id?: number | IntFilter
  published?: boolean | BooleanFilter
  title?: string | StringFilter
  AND?: Enumerable<PostScalarWhereInput>
  OR?: Enumerable<PostScalarWhereInput>
  NOT?: Enumerable<PostScalarWhereInput>
}

export type PostUpdateManyDataInput = {
  content?: string | null
  createdAt?: Date | string
  id?: number
  published?: boolean
  title?: string
}

export type PostUpdateManyWithWhereNestedInput = {
  where: PostScalarWhereInput
  data: PostUpdateManyDataInput
}

export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: PostWhereUniqueInput
  update: PostUpdateWithoutAuthorDataInput
  create: PostCreateWithoutAuthorInput
}

export type PostUpdateManyWithoutAuthorInput = {
  create?: Enumerable<PostCreateWithoutAuthorInput>
  connect?: Enumerable<PostWhereUniqueInput>
  set?: Enumerable<PostWhereUniqueInput>
  disconnect?: Enumerable<PostWhereUniqueInput>
  delete?: Enumerable<PostWhereUniqueInput>
  update?: Enumerable<PostUpdateWithWhereUniqueWithoutAuthorInput>
  updateMany?: Enumerable<PostUpdateManyWithWhereNestedInput>
  deleteMany?: Enumerable<PostScalarWhereInput>
  upsert?: Enumerable<PostUpsertWithWhereUniqueWithoutAuthorInput>
}

export type UserUpdateWithoutProfileDataInput = {
  email?: string
  id?: number
  name?: string | null
  posts?: PostUpdateManyWithoutAuthorInput
}

export type UserUpsertWithoutProfileInput = {
  update: UserUpdateWithoutProfileDataInput
  create: UserCreateWithoutProfileInput
}

export type UserUpdateOneRequiredWithoutProfileInput = {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateWithoutProfileDataInput
  upsert?: UserUpsertWithoutProfileInput
}

export type ProfileUpdateInput = {
  bio?: string | null
  id?: number
  user?: UserUpdateOneRequiredWithoutProfileInput
}

export type ProfileUpdateManyMutationInput = {
  bio?: string | null
  id?: number
}

export type UserCreateInput = {
  email: string
  name?: string | null
  posts?: PostCreateManyWithoutAuthorInput | null
  profile?: ProfileCreateOneWithoutUserInput | null
}

export type UserUpdateInput = {
  email?: string
  id?: number
  name?: string | null
  posts?: PostUpdateManyWithoutAuthorInput
  profile?: ProfileUpdateOneWithoutUserInput
}

export type UserUpdateManyMutationInput = {
  email?: string
  id?: number
  name?: string | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type IntFilter = {
  equals?: number
  not?: number | IntFilter
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
}

export type StringFilter = {
  equals?: string
  not?: string | StringFilter
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
}

export type PostFilter = {
  every?: PostWhereInput
  some?: PostWhereInput
  none?: PostWhereInput
}

export type DateTimeFilter = {
  equals?: Date | string
  not?: Date | string | DateTimeFilter
  in?: Enumerable<Date | string>
  notIn?: Enumerable<Date | string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
}

export type BooleanFilter = {
  equals?: boolean
  not?: boolean | BooleanFilter
}

export type PostOrderByInput = {
  authorId?: OrderByArg | null
  content?: OrderByArg | null
  createdAt?: OrderByArg | null
  id?: OrderByArg | null
  published?: OrderByArg | null
  title?: OrderByArg | null
}

export type ProfileOrderByInput = {
  bio?: OrderByArg | null
  id?: OrderByArg | null
  userId?: OrderByArg | null
}

export type UserOrderByInput = {
  email?: OrderByArg | null
  id?: OrderByArg | null
  name?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
