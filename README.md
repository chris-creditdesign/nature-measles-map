# Nature Measles Map

## Data to download 

Vaccination rate 1980 - 2017: http://apps.who.int/gho/athena/data/xmart.csv?target=GHO/WHS8_110&profile=crosstable&filter=COUNTRY:*&x-sideaxis=COUNTRY&x-topaxis=GHO;YEAR

Cases 1980 - 2017: https://www.who.int/entity/immunization/monitoring_surveillance/data/incidence_series.xls

New Cases data 2018 - 2018 `from measlesreportedcasesbycountry.xls` supplied by WHO

## Edits to make to shapefiles in QGIS

**Simplified**

Remove all extraneous islands and regions and areas that cross over from left to right, just keeping the mainland. Heavily simplify the geometry. 

**taiwan-merge**

Combine the China and Taiwan polygons as China.

TODO:
- Live region should be activated by slider
- Clicking on a country shouldn't reset the region
- Proper titles / captions for the line charts
- Import presentational components from shared library