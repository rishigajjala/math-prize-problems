#!/usr/bin/env ruby

require "json"
require "yaml"

metadata_path = ARGV.fetch(0)
statements_path = ARGV.fetch(1)
output_path = ARGV.fetch(2)

year_overrides = {
  "1" => [1931, "exact"],
  "3" => [1974, "earliest source"],
  "20" => [1960, "approximate"],
  "28" => [1941, "exact"],
  "30" => [1961, "earliest source"],
  "39" => [1956, "earliest source"],
  "40" => [1995, "earliest source"],
  "41" => [1977, "earliest source"],
  "50" => [1995, "exact"],
  "52" => [1977, "earliest source"],
  "66" => [1956, "earliest source"],
  "74" => [1982, "exact"],
  "77" => [1961, "earliest source"],
  "89" => [1946, "exact"],
  "138" => [1957, "earliest source"],
  "142" => [1980, "earliest source"],
  "143" => [1961, "earliest source"],
  "146" => [1984, "exact"],
  "161" => [1990, "exact"],
  "500" => [1961, "earliest source"],
  "564" => [1965, "exact"],
  "592" => [1982, "earliest source"],
  "593" => [1995, "exact"],
  "601" => [1970, "exact"],
  "604" => [1957, "earliest source"],
  "625" => [1989, "approximate"],
  "687" => [1979, "earliest source"],
  "712" => [1971, "earliest source"],
  "713" => [1970, "exact"],
  "1191" => [1980, "exact"],
}

statement_overrides = {
  "1191" => "Determine the sharp lower-density behavior possible for infinite Sidon sets, including whether the known density barriers can be attained or improved.",
}

def inferred_year(text)
  lead = text.to_s.split("\n\nReferences").first.to_s[0, 1800]
  explicit = lead.scan(/\b(19[3-9]\d|20[0-2]\d)\b/).flatten.map(&:to_i)
  citations = lead.scan(/\\cite\{[^}]*?(\d{2})[a-z]?\}/).flatten.map do |value|
    year = value.to_i
    year <= 26 ? 2000 + year : 1900 + year
  end
  years = (explicit + citations).select { |year| year.between?(1930, 2026) }
  years.min
end

statements = {}
File.foreach(statements_path) do |line|
  row = JSON.parse(line)
  statements[row.fetch("number")] = row
end

metadata = YAML.load_file(metadata_path)
open_prize_rows = metadata.select do |row|
  row["prize"] != "no" &&
    row.dig("status", "state") == "open" &&
    row["number"] != "1135"
end

records = open_prize_rows.map do |row|
  number = row.fetch("number")
  source_text = statements[number] || {}
  override = year_overrides[number]
  year = override&.first || inferred_year(source_text["additional_text"])
  precision = override&.last || (year ? "source estimate" : "unknown")
  tags = row.fetch("tags", [])
  prize = row.fetch("prize")
  currency =
    if prize.start_with?("$")
      "USD"
    elsif prize.start_with?("₹")
      "INR"
    else
      "OTHER"
    end
  amount = prize.gsub(/[^\d.]/, "").to_f

  {
    "id" => "erdos-#{number}",
    "title" => "Erdős Problem ##{number}",
    "family" => "Erdős",
    "type" => "conjecture",
    "field" => tags.first&.split&.map(&:capitalize)&.join(" ") || "Mathematics",
    "tags" => tags,
    "statement" => statement_overrides[number] || source_text["latex"] || "See the canonical problem page for the current statement.",
    "openSince" => year,
    "openSincePrecision" => precision,
    "prizeAmount" => amount,
    "prizeCurrency" => currency,
    "prizeLabel" => prize,
    "sponsor" => "Paul Erdős / Combinatorics Foundation",
    "paymentCertainty" => "documented",
    "verification" => "verified",
    "lastVerified" => "2026-07-26",
    "terms" => "A solution must appear in a reputable journal, with documentation that Erdős offered the displayed amount. Claims are administered by the Combinatorics Foundation; erdosproblems.com does not pay awards.",
    "sourceUrl" => "https://www.erdosproblems.com/#{number}",
    "rulesUrl" => "https://www.erdosproblems.com/faq",
    "sourceLabel" => "Canonical problem page",
    "oeis" => row.fetch("oeis", []),
  }
end

File.write(output_path, JSON.pretty_generate(records) + "\n")
puts "Wrote #{records.length} strict-open prize records to #{output_path}"
