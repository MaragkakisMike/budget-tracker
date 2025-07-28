import { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";
import { pie, arc } from "d3-shape";
import CardContainer from "@/src/components/CardContainer";
import useColors from "@/src/stores/theme-store";
import { TColors } from "@/src/styles/colors";
import useStyles from "@/src/hooks/useStyles";
import { useTranslation } from "react-i18next";
import { Category } from "@/src/db/schema";

const PieChartExpenses = ({ expenseCategories, totalExpense }) => {
  const { colors } = useColors();
  const { styles } = useStyles(createStyles);
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  const screenWidth = Dimensions.get("window").width;
  const chartSize = screenWidth * 0.8;
  const viewBoxSize = 250;
  const radius = 110;
  const innerRadius = 80;

  const pieData = pie<Category>().value((d) => d.totalAmount)(
    expenseCategories
  );

  const arcGenerator = arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .padAngle(0.02);

  const handlePress = (categoryId: string) => {
    setSelected((prevSelected) =>
      prevSelected === categoryId ? null : categoryId
    );
  };

  const unAssignedExpenses = useMemo(() => {
    const totalAssigned = expenseCategories.reduce(
      (acc, cat) => acc + cat.totalAmount,
      0
    );
    if (totalAssigned < totalExpense) {
      return totalExpense - totalAssigned;
    }
  }, [expenseCategories]);

  const selectedCategory = useMemo(
    () => expenseCategories.find((cat) => cat.categoryId === selected),
    [selected, expenseCategories]
  );

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <CardContainer title={t("transactions.expenses")}>
        <Svg
          width={chartSize}
          height={chartSize}
          viewBox={`-${viewBoxSize / 2} -${
            viewBoxSize / 2
          } ${viewBoxSize} ${viewBoxSize}`}
        >
          <G>
            {!pieData || pieData.length === 0 ? (
              <Path
                d={arc()
                  .innerRadius(innerRadius)
                  .outerRadius(radius)
                  .startAngle(0)
                  .endAngle(2 * Math.PI)()}
                fill="#808080"
                opacity={0.2}
              />
            ) : (
              pieData.map((slice, index) => (
                <Path
                  key={slice.data.categoryId}
                  d={arcGenerator(slice) || ""}
                  fill={slice.data.color}
                  onPressIn={() => handlePress(slice.data.categoryId)}
                  opacity={
                    selected === slice.data.categoryId || !selected ? 1 : 0.3
                  }
                  strokeWidth={1}
                />
              ))
            )}
          </G>

          <SvgText
            x={0}
            y={-10}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={20}
            fontWeight="bold"
            fill={colors.textPrimary}
          >
            {selectedCategory ? selectedCategory.categoryName : "Total"}
          </SvgText>

          <SvgText
            x={0}
            y={15}
            textAnchor="middle"
            alignmentBaseline="baseline"
            fontSize={20}
            fontWeight="bold"
            fill={colors.textPrimary}
          >
            {selectedCategory
              ? `€${selectedCategory.totalAmount}`
              : `€${totalExpense}`}
          </SvgText>

          {unAssignedExpenses && !selectedCategory && (
            <>
              <SvgText
                x={0}
                y={30}
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize={12}
                fill={colors.textSecondary}
              >
                {t("transactions.uncategorized")}
              </SvgText>
              <SvgText
                x={0}
                y={50}
                textAnchor="middle"
                alignmentBaseline="baseline"
                fontSize={12}
                fill={colors.textSecondary}
              >
                {`€${unAssignedExpenses}`}
              </SvgText>
            </>
          )}

          <Path
            d={arc()
              .innerRadius(0)
              .outerRadius(70)
              .startAngle(0)
              .endAngle(2 * Math.PI)()}
            fill="transparent"
            onPressIn={() => setSelected(null)}
          />
        </Svg>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {expenseCategories
            .sort((a, b) => b.totalAmount - a.totalAmount)
            .map((item) => (
              <TouchableOpacity
                key={item.categoryId}
                onPress={() => handlePress(item.categoryId)}
                style={styles.legendItem}
              >
                <View
                  style={[
                    styles.legendColorCircle,
                    {
                      backgroundColor: item.color,
                      opacity:
                        selected === item.categoryId || !selected ? 1 : 0.2,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.legendText,
                    selected === item.categoryId && styles.selectedText,
                  ]}
                >
                  {item.categoryName}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </CardContainer>
    </View>
  );
};

export default PieChartExpenses;

const createStyles = (colors: TColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
    },
    legendScrollView: {
      marginTop: 16,
      maxWidth: "100%",
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
    },
    legendColorCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 8,
    },
    legendText: {
      fontSize: 14,
      color: colors.textPrimary,
    },
    selectedText: {
      fontWeight: "bold",
    },
  });
