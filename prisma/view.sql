select * from product_full_json
      WHERE slug = 'oak-kitchen-dining-chair'


CREATE VIEW product_full_json AS
SELECT 
	p.id,
	p.slug,
	p.category_id,
	jsonb_build_object(
      'id', p.id,
      'name', p.name,
      'slug', p.slug,
      'price', p.price,
      'available_quantity', p.available_quantity,
      'is_active', p.is_active,
      'description', p.description,

      'category', jsonb_build_object(
          'id', c.id,
          'name', c.name
      ),

      'images', (
          SELECT jsonb_agg(
              jsonb_build_object(
                  'id', pi.id,
                  'url', pi.url
              )
          )
          FROM product_images pi
          WHERE pi.product_id = p.id
      ),

      'attributes', (
          SELECT jsonb_object_agg(
              a.slug, av.value
          )
          FROM product_attribute_values pav
          JOIN attribute_values av ON av.id = pav.attribute_value_id
          JOIN attributes a ON a.id = av.attribute_id
          WHERE pav.product_id = p.id
      )
    ) AS product
    FROM products p
    JOIN categories c ON c.id = p.category_id