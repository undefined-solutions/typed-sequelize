
import {Model} from '../model';
import {ColumnOptions} from '../model';

export abstract class Association {
  associationType: string;
  source: typeof Model;
  target: typeof Model;
  isSelfAssociation: boolean;
  as: string;
  isAliased: boolean;
  foreignKey: string;
  identifier: string;
  toInstanceArray(objs: any): Model[];
  inspect(): string;
}


/** Foreign Key Options */
export interface ForeignKeyOptions extends ColumnOptions {

  /** Attribute name for the relation */
  name?: string;
}


/**
 * Options provided when associating models
 */
export interface AssociationOptions {

  /**
   * Set to true to run before-/afterDestroy hooks when an associated model is deleted because of a cascade.
   * For example if `User.hasOne(Profile, {onDelete: 'cascade', hooks:true})`, the before-/afterDestroy hooks
   * for profile will be called when a user is deleted. Otherwise the profile will be deleted without invoking
   * any hooks.
   *
   * Defaults to false
   */
  hooks?: boolean;

  /**
   * The alias of this model, in singular form. See also the `name` option passed to `sequelize.define`. If
   * you create multiple associations between the same tables, you should provide an alias to be able to
   * distinguish between them. If you provide an alias when creating the assocition, you should provide the
   * same alias when eager loading and when getting assocated models. Defaults to the singularized name of
   * target
   */
  as?: string | { singular: string, plural: string };

  /**
   * The name of the foreign key in the target table or an object representing the type definition for the
   * foreign column (see `Sequelize.define` for syntax). When using an object, you can add a `name` property
   * to set the name of the column. Defaults to the name of source + primary key of source
   */
  foreignKey?: string | ForeignKeyOptions;

  /**
   * What happens when delete occurs.
   *
   * Cascade if this is a n:m, and set null if it is a 1:m
   *
   * Defaults to 'SET NULL' or 'CASCADE'
   */
  onDelete?: string;

  /**
   * What happens when update occurs
   *
   * Defaults to 'CASCADE'
   */
  onUpdate?: string;

  /**
   * Should on update and on delete constraints be enabled on the foreign key.
   */
  constraints?: boolean;
  foreignKeyConstraint?: boolean;

}


/**
 * Options for Association Scope
 */
export interface AssociationScope {

  /**
   * The name of the column that will be used for the associated scope and it's value
   */
  [scopeName: string]: any;
}

/**
 * Options provided for many-to-many relationships
 */
export interface ManyToManyOptions extends AssociationOptions {

  /**
   * A key/value set that will be used for association create and find defaults on the target.
   * (sqlite not supported for N:M)
   */
  scope?: AssociationScope;
}
