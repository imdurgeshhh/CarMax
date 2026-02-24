import { integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CarListing=pgTable('carListing',{
    id:serial('id').primaryKey(),
    listingTitle:varchar('listingTitle').notNull(),
    tagline:varchar('tagline'),
    originalPrice:varchar('originalPrice'),
    sellingPrice:varchar('sellingPrice').notNull(),
    category:varchar('category').notNull(),
    condition:varchar('condition').notNull(),
    make:varchar('make').notNull(),
    model:varchar('model').notNull(),
    year:varchar('year').notNull(),
    driveType:varchar('driveType').notNull(),
    transmission:varchar('transmission').notNull(),
    fuelType:varchar('fuelType').notNull(),
    mileage:varchar('mileage').notNull(),
    engineSize:varchar('engineSize'),
    cylinder:varchar('cylinder'),
    color:varchar('color').notNull(),
    door:varchar('door').notNull(),
    vin:varchar('vin'),
    offerType:varchar('offerType'),
    listingDescription:varchar('listingDescription').notNull(),
    feature:json('features'),
    createdBy:varchar('createdBy').default('demo123@gmail.com'),
    userName:varchar('userName').notNull().default('Durgesh'),
    userImageUrl:varchar('userImageUrl').default('https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    postedOn:varchar('postedOn')

})

export const CarImages=pgTable('carImages',{
    id:serial('id').primaryKey(),
    imageUrl:varchar('imageUrl').notNull(),
    CarListingId:integer('carListingId').references(()=>CarListing.id).notNull()
})
