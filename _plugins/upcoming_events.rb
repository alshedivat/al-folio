module Reading
    class Generator < Jekyll::Generator
      VERSION = '0.1.0'
  
      def generate(site)
        site.collections.each do |name, collection|
          if name == 'events'
            site.data['upcoming_events'] = collection.docs.select { |event| event.data['start'] >= Time.now }
            site.data['previous_events'] = collection.docs.select { |event| event.data['end'] < Time.now }
          end
        end
      end
  
    end
  end
  