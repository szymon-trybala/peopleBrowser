using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace DataDisplayAPI.Helpers
{
    public static class CsvConverter
    {
        public static string ToCsv<T>(IEnumerable<T> items)
        {
            // Getting names of fields in object
            Type itemType = typeof(T);
            var itemFieldsNames = itemType.GetProperties(BindingFlags.Public | BindingFlags.Instance).OrderBy(x => x.Name);

            StringBuilder csvString = new StringBuilder();

            // Adding first line of .csv file with indexes of further items
            csvString.AppendLine(string.Join(", ", itemFieldsNames.Select(x => x.Name)));

            // Adding lines of .csv file with data of items in object
            foreach(var item in items) 
                csvString.AppendLine(string.Join(", ", itemFieldsNames.Select(x => x.GetValue(item, null))));

            return csvString.ToString();
        }
    }
}